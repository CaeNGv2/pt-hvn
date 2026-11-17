import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { PetType } from '../entities/pet-type.entity.js';
import { Tag } from '../entities/tag.entity.js';
import { Pet } from '../entities/pet.entity.js';
import { Member } from '../entities/member.entity.js';

// ---------------------------------------------------------------------------
// Static seed data
// ---------------------------------------------------------------------------

const PET_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'turtle'];

const TAGS = [
  'easy to handle',
  'potty trained',
  'diabetic',
  'hard to train',
  'good with kids',
  'good with other pets',
  'neutered/spayed',
  'vaccinated',
  'senior',
  'playful',
  'shy',
  'house trained',
];

interface SeedPet {
  name: string;
  type: string;
  breed: string | null;
  ageYears: number;
  gender: 'male' | 'female' | 'unknown';
  summaryDesc: string;
  fullDesc: string;
  photoUrl: string | null;
  tags: string[];
}

const SEED_PETS: SeedPet[] = [
  // ── Dogs
  {
    name: 'Max', type: 'dog', breed: 'Golden Retriever', ageYears: 3, gender: 'male',
    summaryDesc: 'Friendly golden boy who loves fetch.',
    fullDesc: 'Max is a 3-year-old neutered Golden Retriever who adores people and other dogs. He knows basic commands and is fully house trained.',
    photoUrl: "data:image/jpeg;base64,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",
    tags: ['neutered/spayed', 'potty trained', 'good with kids', 'good with other pets', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Bella', type: 'dog', breed: 'Beagle', ageYears: 1.5, gender: 'female',
    summaryDesc: 'Energetic beagle pup looking for an active family.',
    fullDesc: 'Bella is a lively Beagle who loves long walks and playtime. She is still learning commands but picks up quickly.',
    photoUrl: "https://i.imgur.com/nVpUCyb.png",
    tags: ['vaccinated', 'playful', 'good with kids'],
  },
  {
    name: 'Rocky', type: 'dog', breed: 'Shih Tzu', ageYears: 5, gender: 'male',
    summaryDesc: 'Lap dog extraordinaire—calm and cuddly.',
    fullDesc: 'Rocky is a gentle Shih Tzu who prefers lounging on the sofa over outdoor adventures. Great for apartment living.',
    photoUrl: "https://i.imgur.com/3hsCs6W.png",
    tags: ['neutered/spayed', 'potty trained', 'house trained', 'easy to handle', 'vaccinated'],
  },
  {
    name: 'Luna', type: 'dog', breed: 'Mixed Breed', ageYears: 2, gender: 'female',
    summaryDesc: 'Sweet mixed girl, loves everyone she meets.',
    fullDesc: 'Luna was rescued from the streets and has blossomed into a confident, affectionate dog. She is spayed and up to date on vaccines.',
    photoUrl: "https://i.imgur.com/ib8sn94.jpeg",
    tags: ['neutered/spayed', 'vaccinated', 'playful', 'good with kids', 'good with other pets'],
  },
  {
    name: 'Charlie', type: 'dog', breed: 'Corgi', ageYears: 4, gender: 'male',
    summaryDesc: 'Corgi with big ears and a bigger heart.',
    fullDesc: 'Charlie is a playful Pembroke Welsh Corgi who is great with children and other dogs. He is fully potty trained.',
    photoUrl: "https://i.imgur.com/8RTk9ll.png",
    tags: ['potty trained', 'good with kids', 'playful', 'vaccinated'],
  },
  {
    name: 'Daisy', type: 'dog', breed: 'Labrador Mix', ageYears: 7, gender: 'female',
    summaryDesc: 'Senior lab mix who still has plenty of love to give.',
    fullDesc: 'Daisy is a sweet senior dog who enjoys gentle walks and naps. She has a mild diabetic condition managed with diet.',
    photoUrl: "data:image/jpeg;base64,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",
    tags: ['senior', 'diabetic', 'easy to handle', 'neutered/spayed', 'vaccinated'],
  },
  {
    name: 'Buddy', type: 'dog', breed: 'German Shepherd', ageYears: 2, gender: 'male',
    summaryDesc: 'Intelligent shepherd looking for an experienced owner.',
    fullDesc: 'Buddy is a smart but high-energy German Shepherd who needs consistent training and mental stimulation. Not recommended for first-time owners.',
    photoUrl: "https://i.imgur.com/i59Z7ly.png",
    tags: ['hard to train', 'vaccinated', 'playful'],
  },
  // ── Cats
  {
    name: 'Whiskers', type: 'cat', breed: 'Domestic Shorthair', ageYears: 4, gender: 'female',
    summaryDesc: 'Independent but affectionate tabby.',
    fullDesc: 'Whiskers is a classic tabby who enjoys sunbathing and the occasional cuddle session on her own terms. She is litter-box trained.',
    photoUrl: "https://cdn2.thecatapi.com/images/8mf.jpg",
    tags: ['neutered/spayed', 'potty trained', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Oliver', type: 'cat', breed: 'Orange Tabby', ageYears: 1, gender: 'male',
    summaryDesc: 'Mischievous kitten full of energy.',
    fullDesc: 'Oliver is a curious orange tabby who loves toys and climbing. He will keep you entertained for hours.',
    photoUrl: "https://i.imgur.com/kGYzWes.png",
    tags: ['vaccinated', 'playful', 'good with other pets'],
  },
  {
    name: 'Mittens', type: 'cat', breed: 'Persian', ageYears: 6, gender: 'female',
    summaryDesc: 'Regal Persian who deserves a quiet home.',
    fullDesc: 'Mittens is a fluffy Persian who prefers calm environments. She dislikes loud noises and young children but adores adults who appreciate her grace.',
    photoUrl: null,
    tags: ['neutered/spayed', 'potty trained', 'vaccinated', 'shy'],
  },
  {
    name: 'Shadow', type: 'cat', breed: 'Domestic Longhair', ageYears: 3, gender: 'male',
    summaryDesc: 'Black cat that proves the superstitions wrong.',
    fullDesc: 'Shadow is an affectionate and playful black cat who loves interactive toys. He gets along with other cats.',
    photoUrl: "https://i.imgur.com/5hHKhmd.png",
    tags: ['neutered/spayed', 'vaccinated', 'playful', 'good with other pets'],
  },
  {
    name: 'Cleo', type: 'cat', breed: 'Siamese Mix', ageYears: 5, gender: 'female',
    summaryDesc: 'Vocal and social Siamese who craves attention.',
    fullDesc: 'Cleo will tell you about her day in great detail. She bonds deeply with her person and does best as the only pet.',
    photoUrl: "https://i.imgur.com/eIuctd5.jpeg",
    tags: ['neutered/spayed', 'potty trained', 'vaccinated'],
  },
  {
    name: 'Leo', type: 'cat', breed: 'Maine Coon Mix', ageYears: 2, gender: 'male',
    summaryDesc: 'Gentle giant with a fluffy mane.',
    fullDesc: 'Leo is a large, laid-back Maine Coon mix who loves being brushed and watching birds from the window.',
    photoUrl: null,
    tags: ['neutered/spayed', 'vaccinated', 'easy to handle', 'good with kids'],
  },
  {
    name: 'Nala', type: 'cat', breed: 'Calico', ageYears: 8, gender: 'female',
    summaryDesc: 'Senior calico—calm and low maintenance.',
    fullDesc: 'Nala is a sweet senior cat who prefers quiet homes. She has a mild dental condition that requires yearly check-ups.',
    photoUrl: null,
    tags: ['senior', 'neutered/spayed', 'vaccinated', 'easy to handle'],
  },
  // ── Birds
  {
    name: 'Tweety', type: 'bird', breed: 'Budgerigar', ageYears: 1, gender: 'unknown',
    summaryDesc: 'Cheerful budgie with a bright yellow plumage.',
    fullDesc: 'Tweety loves music and mirrors. Easy to care for and great for beginners.',
    photoUrl: "https://i.imgur.com/MagzCia.png",
    tags: ['easy to handle', 'playful'],
  },
  {
    name: 'Polly', type: 'bird', breed: 'African Grey Parrot', ageYears: 6, gender: 'female',
    summaryDesc: 'Highly intelligent parrot with a 100-word vocabulary.',
    fullDesc: 'Polly requires daily mental stimulation and social interaction. She bonds strongly and can be demanding but is incredibly rewarding.',
    photoUrl: "https://i.imgur.com/47YpFAp.png",
    tags: ['hard to train', 'playful'],
  },
  {
    name: 'Rio', type: 'bird', breed: 'Cockatiel', ageYears: 3, gender: 'male',
    summaryDesc: 'Gentle cockatiel who loves head scratches.',
    fullDesc: 'Rio is a hand-raised cockatiel who whistles tunes and enjoys being out of his cage for supervised free time.',
    photoUrl: null,
    tags: ['easy to handle', 'good with kids'],
  },
  {
    name: 'Kiwi', type: 'bird', breed: 'Lovebird', ageYears: 2, gender: 'female',
    summaryDesc: 'Colourful lovebird with a feisty personality.',
    fullDesc: 'Kiwi is best adopted with a partner bird. Lively and curious, she needs daily out-of-cage time.',
    photoUrl: "https://i.imgur.com/Gls2i6E.png",
    tags: ['playful', 'good with other pets'],
  },
  // ── Rabbits
  {
    name: 'Thumper', type: 'rabbit', breed: 'Holland Lop', ageYears: 2, gender: 'male',
    summaryDesc: 'Floppy-eared rabbit that is incredibly gentle.',
    fullDesc: 'Thumper is a litter-trained Holland Lop who enjoys hay and leafy greens. He happily hops around a rabbit-proofed room.',
    photoUrl: "https://i.imgur.com/DUZpvNv.png",
    tags: ['potty trained', 'easy to handle', 'neutered/spayed', 'good with kids'],
  },
  {
    name: 'Clover', type: 'rabbit', breed: 'Mini Rex', ageYears: 1, gender: 'female',
    summaryDesc: 'Velvety soft Mini Rex bunny.',
    fullDesc: '"https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Dalmatian_Pattern_Mini_Rex.jpg/250px-Dalmatian_Pattern_Mini_Rex.jpg" has the softest fur you will ever touch. She is active and curious, loves exploring new spaces.',
    photoUrl: null,
    tags: ['vaccinated', 'playful', 'easy to handle'],
  },
  {
    name: 'Biscuit', type: 'rabbit', breed: 'Lionhead', ageYears: 3, gender: 'male',
    summaryDesc: 'Fluffy Lionhead rabbit—shy at first, loyal once bonded.',
    fullDesc: 'Biscuit takes time to warm up to new people but becomes a devoted companion. He needs daily grooming.',
    photoUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Lionhead_Rabbit_with_black_nose.jpg/250px-Lionhead_Rabbit_with_black_nose.jpg",
    tags: ['shy', 'neutered/spayed', 'potty trained'],
  },
  {
    name: 'Hazel', type: 'rabbit', breed: 'Dutch Rabbit', ageYears: 4, gender: 'female',
    summaryDesc: 'Classic black-and-white Dutch rabbit, calm and friendly.',
    fullDesc: 'Hazel is a relaxed, easy-going rabbit who gets along with other rabbits and even gentle cats.',
    photoUrl: null,
    tags: ['easy to handle', 'potty trained', 'good with other pets', 'neutered/spayed'],
  },
  // ── Turtles ───────────────────────────────────────────────────────────────
  {
    name: 'Shelly', type: 'turtle', breed: 'Red-eared Slider', ageYears: 5, gender: 'female',
    summaryDesc: 'Hardy turtle perfect for first-time reptile owners.',
    fullDesc: 'Shelly is healthy and well-adjusted. She needs a proper aquatic setup with basking area and UVB lighting.',
    photoUrl: "https://scontent.fsin4-1.fna.fbcdn.net/v/t39.30808-6/499715336_9911961988879396_3121257562413693941_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Qxo19t_1-3AQ7kNvwFIE7pl&_nc_oc=Adogx6KNHs9R0gh1y1MVvmT0nwEx6qCisaunviR42qXOLzXZNphkegi-Mdvy-nSftcdXzHkQZWNelV1CQ1Wx8Hs3&_nc_zt=23&_nc_ht=scontent.fsin4-1.fna&_nc_gid=MF85J8piC9J28zHWXt-jpw&_nc_ss=7b289&oh=00_AQT1rHbi0nhlGmckASFmmPo3NkPTso6XjFGmRAFuBTjQIA&oe=6B025468",
    tags: ['easy to handle', 'vaccinated'],
  },
  {
    name: 'Tank', type: 'turtle', breed: 'Box Turtle', ageYears: 10, gender: 'male',
    summaryDesc: 'Senior box turtle—slow, steady, and low maintenance.',
    fullDesc: 'Tank is a decade-old box turtle who is a terrific long-term companion. He is in excellent health.',
    photoUrl: "https://i.imgur.com/kE9sHtA.png",
    tags: ['senior', 'easy to handle'],
  },
  {
    name: 'Marble', type: 'turtle', breed: 'Painted Turtle', ageYears: 3, gender: 'unknown',
    summaryDesc: 'Beautifully marked painted turtle.',
    fullDesc: 'Marble has striking red and yellow patterns. Active swimmer who enjoys a well-maintained aquatic environment.',
    photoUrl: "https://i.imgur.com/QPsYBCM.png",
    tags: ['easy to handle', 'playful'],
  },
  // ── Additional variety
  {
    name: 'Pepper', type: 'dog', breed: 'Dalmatian', ageYears: 3, gender: 'female',
    summaryDesc: 'Spotted beauty with boundless energy.',
    fullDesc: 'Pepper needs an active family with space to run. She excels at agility training and loves swimming.',
    photoUrl: "https://i.imgur.com/mkWLRUs.png",
    tags: ['vaccinated', 'playful', 'hard to train'],
  },
  {
    name: 'Mochi', type: 'cat', breed: 'Scottish Fold', ageYears: 2, gender: 'male',
    summaryDesc: 'Round-eared cat with a chilled-out vibe.',
    fullDesc: 'Mochi is a relaxed Scottish Fold who enjoys co-working sessions on your lap. Very quiet breed.',
    photoUrl: null,
    tags: ['neutered/spayed', 'potty trained', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Ginger', type: 'cat', breed: 'Domestic Shorthair', ageYears: 9, gender: 'female',
    summaryDesc: 'Senior ginger cat ready for retirement in a cosy home.',
    fullDesc: 'Ginger has lived with the same family for 9 years but was surrendered due to relocation. She is calm, litter trained, and low maintenance.',
    photoUrl: "https://i.imgur.com/XFmP0EH.png",
    tags: ['senior', 'neutered/spayed', 'potty trained', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Peanut', type: 'rabbit', breed: 'Netherland Dwarf', ageYears: 1, gender: 'male',
    summaryDesc: 'Tiny dwarf rabbit with a big personality.',
    fullDesc: 'Peanut is the smallest rabbit in the shelter but makes up for it with energy and curiosity.',
    photoUrl: "https://i.imgur.com/lkrryd7.png",
    tags: ['playful', 'easy to handle', 'vaccinated'],
  },
  {
    name: 'Splash', type: 'turtle', breed: 'Red-eared Slider', ageYears: 2, gender: 'unknown',
    summaryDesc: 'Young turtle who loves to bask and swim.',
    fullDesc: 'Splash is a healthy juvenile Red-eared Slider requiring a large aquatic enclosure with a good filter.',
    photoUrl: "https://i.imgur.com/SSoI4xf.png",
    tags: ['easy to handle'],
  },
];

interface SeedMember {
  fullName: string;
  email: string;
  password: string;
  phone: string | null;
}

const SEED_MEMBERS: SeedMember[] = [
  { fullName: 'Alice Tan', email: 'alice@example.com', password: 'password1', phone: '+65 9123 0001' },
  { fullName: 'Bob Lim', email: 'bob@example.com', password: 'password2', phone: '+65 9123 0002' },
  { fullName: 'Carol Wong', email: 'carol@example.com', password: 'password3', phone: null },
  { fullName: 'David Chen', email: 'david@example.com', password: 'password4', phone: '+65 9123 0004' },
  { fullName: 'Eva Ng', email: 'eva@example.com', password: 'password5', phone: null },
  { fullName: 'Frank Ho', email: 'frank@example.com', password: 'password6', phone: '+65 9123 0006' },
];


@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(PetType)
    private readonly typeRepo: Repository<PetType>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    private readonly dataSource: DataSource,
  ) {}

  /** Seed only when the database is empty (used on first boot). */
  async seedIfFresh(): Promise<void> {
    const existingTypes = await this.typeRepo.count();
    if (existingTypes > 0) {
      this.logger.log('Database already seeded – skipping.');
      return;
    }

    this.logger.log('Fresh database detected – seeding sample data…');
    await this.seedData();
  }

  /**
   * Force a full reset: truncate every table (members, pets, requests, …)
   * and re-insert the static demo data. Destructive — intended for demos.
   */
  async resetToSeed(): Promise<void> {
    this.logger.warn('Force-resetting database to seed data…');
    await this.clearAll();
    await this.seedData();
    this.logger.warn('Database reset complete.');
  }

  /**
   * Remove all rows. FK checks are disabled around the truncation so order
   * doesn't matter and join tables are cleared too.
   */
  private async clearAll(): Promise<void> {
    // Table names must match the @Entity() names used above.
    const tables = [
      'adoption_application',
      'released_pet',
      'pet_tag', // many-to-many join table
      'pet',
      'tag',
      'pet_type',
      'member',
    ];
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    try {
      for (const table of tables) {
        await this.dataSource.query(`TRUNCATE TABLE \`${table}\``);
      }
    } finally {
      await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  }

  /** Inserts the static demo dataset. Assumes tables are empty. */
  private async seedData(): Promise<void> {
    // 1. Types
    const typeMap = new Map<string, PetType>();
    for (const name of PET_TYPES) {
      const t = await this.typeRepo.save(this.typeRepo.create({ name }));
      typeMap.set(name, t);
    }

    // 2. Tags
    const tagMap = new Map<string, Tag>();
    for (const name of TAGS) {
      const t = await this.tagRepo.save(this.tagRepo.create({ name }));
      tagMap.set(name, t);
    }

    // 3. Members
    for (const m of SEED_MEMBERS) {
      const passwordHash = await bcrypt.hash(m.password, 10);
      await this.memberRepo.save(
        this.memberRepo.create({
          fullName: m.fullName,
          email: m.email,
          passwordHash,
          phone: m.phone,
        }),
      );
    }

    // 4. Pets
    for (const p of SEED_PETS) {
      const pet = this.petRepo.create({
        name: p.name,
        type: typeMap.get(p.type) ?? null,
        breed: p.breed,
        ageYears: p.ageYears,
        gender: p.gender,
        summaryDesc: p.summaryDesc,
        fullDesc: p.fullDesc,
        isAvailable: true,
        tags: p.tags
          .map((name) => tagMap.get(name))
          .filter((t): t is Tag => t !== undefined),
      });
      pet.photo = p.photoUrl ? { type: 'external', uri: p.photoUrl } : null;
      await this.petRepo.save(pet);
    }

    this.logger.log(
      `Seed complete: ${PET_TYPES.length} types, ${TAGS.length} tags, ` +
      `${SEED_MEMBERS.length} members, ${SEED_PETS.length} pets.`,
    );
  }
}
