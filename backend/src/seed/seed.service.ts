import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    photoUrl: null,
    tags: ['neutered/spayed', 'potty trained', 'good with kids', 'good with other pets', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Bella', type: 'dog', breed: 'Beagle', ageYears: 1.5, gender: 'female',
    summaryDesc: 'Energetic beagle pup looking for an active family.',
    fullDesc: 'Bella is a lively Beagle who loves long walks and playtime. She is still learning commands but picks up quickly.',
    photoUrl: null,
    tags: ['vaccinated', 'playful', 'good with kids'],
  },
  {
    name: 'Rocky', type: 'dog', breed: 'Shih Tzu', ageYears: 5, gender: 'male',
    summaryDesc: 'Lap dog extraordinaire—calm and cuddly.',
    fullDesc: 'Rocky is a gentle Shih Tzu who prefers lounging on the sofa over outdoor adventures. Great for apartment living.',
    photoUrl: null,
    tags: ['neutered/spayed', 'potty trained', 'house trained', 'easy to handle', 'vaccinated'],
  },
  {
    name: 'Luna', type: 'dog', breed: 'Mixed Breed', ageYears: 2, gender: 'female',
    summaryDesc: 'Sweet mixed girl, loves everyone she meets.',
    fullDesc: 'Luna was rescued from the streets and has blossomed into a confident, affectionate dog. She is spayed and up to date on vaccines.',
    photoUrl: null,
    tags: ['neutered/spayed', 'vaccinated', 'playful', 'good with kids', 'good with other pets'],
  },
  {
    name: 'Charlie', type: 'dog', breed: 'Corgi', ageYears: 4, gender: 'male',
    summaryDesc: 'Corgi with big ears and a bigger heart.',
    fullDesc: 'Charlie is a playful Pembroke Welsh Corgi who is great with children and other dogs. He is fully potty trained.',
    photoUrl: null,
    tags: ['potty trained', 'good with kids', 'playful', 'vaccinated'],
  },
  {
    name: 'Daisy', type: 'dog', breed: 'Labrador Mix', ageYears: 7, gender: 'female',
    summaryDesc: 'Senior lab mix who still has plenty of love to give.',
    fullDesc: 'Daisy is a sweet senior dog who enjoys gentle walks and naps. She has a mild diabetic condition managed with diet.',
    photoUrl: null,
    tags: ['senior', 'diabetic', 'easy to handle', 'neutered/spayed', 'vaccinated'],
  },
  {
    name: 'Buddy', type: 'dog', breed: 'German Shepherd', ageYears: 2, gender: 'male',
    summaryDesc: 'Intelligent shepherd looking for an experienced owner.',
    fullDesc: 'Buddy is a smart but high-energy German Shepherd who needs consistent training and mental stimulation. Not recommended for first-time owners.',
    photoUrl: null,
    tags: ['hard to train', 'vaccinated', 'playful'],
  },
  // ── Cats
  {
    name: 'Whiskers', type: 'cat', breed: 'Domestic Shorthair', ageYears: 4, gender: 'female',
    summaryDesc: 'Independent but affectionate tabby.',
    fullDesc: 'Whiskers is a classic tabby who enjoys sunbathing and the occasional cuddle session on her own terms. She is litter-box trained.',
    photoUrl: null,
    tags: ['neutered/spayed', 'potty trained', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Oliver', type: 'cat', breed: 'Orange Tabby', ageYears: 1, gender: 'male',
    summaryDesc: 'Mischievous kitten full of energy.',
    fullDesc: 'Oliver is a curious orange tabby who loves toys and climbing. He will keep you entertained for hours.',
    photoUrl: null,
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
    photoUrl: null,
    tags: ['neutered/spayed', 'vaccinated', 'playful', 'good with other pets'],
  },
  {
    name: 'Cleo', type: 'cat', breed: 'Siamese Mix', ageYears: 5, gender: 'female',
    summaryDesc: 'Vocal and social Siamese who craves attention.',
    fullDesc: 'Cleo will tell you about her day in great detail. She bonds deeply with her person and does best as the only pet.',
    photoUrl: null,
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
    photoUrl: null,
    tags: ['easy to handle', 'playful'],
  },
  {
    name: 'Polly', type: 'bird', breed: 'African Grey Parrot', ageYears: 6, gender: 'female',
    summaryDesc: 'Highly intelligent parrot with a 100-word vocabulary.',
    fullDesc: 'Polly requires daily mental stimulation and social interaction. She bonds strongly and can be demanding but is incredibly rewarding.',
    photoUrl: null,
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
    photoUrl: null,
    tags: ['playful', 'good with other pets'],
  },
  // ── Rabbits
  {
    name: 'Thumper', type: 'rabbit', breed: 'Holland Lop', ageYears: 2, gender: 'male',
    summaryDesc: 'Floppy-eared rabbit that is incredibly gentle.',
    fullDesc: 'Thumper is a litter-trained Holland Lop who enjoys hay and leafy greens. He happily hops around a rabbit-proofed room.',
    photoUrl: null,
    tags: ['potty trained', 'easy to handle', 'neutered/spayed', 'good with kids'],
  },
  {
    name: 'Clover', type: 'rabbit', breed: 'Mini Rex', ageYears: 1, gender: 'female',
    summaryDesc: 'Velvety soft Mini Rex bunny.',
    fullDesc: 'Clover has the softest fur you will ever touch. She is active and curious, loves exploring new spaces.',
    photoUrl: null,
    tags: ['vaccinated', 'playful', 'easy to handle'],
  },
  {
    name: 'Biscuit', type: 'rabbit', breed: 'Lionhead', ageYears: 3, gender: 'male',
    summaryDesc: 'Fluffy Lionhead rabbit—shy at first, loyal once bonded.',
    fullDesc: 'Biscuit takes time to warm up to new people but becomes a devoted companion. He needs daily grooming.',
    photoUrl: null,
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
    photoUrl: null,
    tags: ['easy to handle', 'vaccinated'],
  },
  {
    name: 'Tank', type: 'turtle', breed: 'Box Turtle', ageYears: 10, gender: 'male',
    summaryDesc: 'Senior box turtle—slow, steady, and low maintenance.',
    fullDesc: 'Tank is a decade-old box turtle who is a terrific long-term companion. He is in excellent health.',
    photoUrl: null,
    tags: ['senior', 'easy to handle'],
  },
  {
    name: 'Marble', type: 'turtle', breed: 'Painted Turtle', ageYears: 3, gender: 'unknown',
    summaryDesc: 'Beautifully marked painted turtle.',
    fullDesc: 'Marble has striking red and yellow patterns. Active swimmer who enjoys a well-maintained aquatic environment.',
    photoUrl: null,
    tags: ['easy to handle', 'playful'],
  },
  // ── Additional variety
  {
    name: 'Pepper', type: 'dog', breed: 'Dalmatian', ageYears: 3, gender: 'female',
    summaryDesc: 'Spotted beauty with boundless energy.',
    fullDesc: 'Pepper needs an active family with space to run. She excels at agility training and loves swimming.',
    photoUrl: null,
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
    photoUrl: null,
    tags: ['senior', 'neutered/spayed', 'potty trained', 'vaccinated', 'easy to handle'],
  },
  {
    name: 'Peanut', type: 'rabbit', breed: 'Netherland Dwarf', ageYears: 1, gender: 'male',
    summaryDesc: 'Tiny dwarf rabbit with a big personality.',
    fullDesc: 'Peanut is the smallest rabbit in the shelter but makes up for it with energy and curiosity.',
    photoUrl: null,
    tags: ['playful', 'easy to handle', 'vaccinated'],
  },
  {
    name: 'Splash', type: 'turtle', breed: 'Red-eared Slider', ageYears: 2, gender: 'unknown',
    summaryDesc: 'Young turtle who loves to bask and swim.',
    fullDesc: 'Splash is a healthy juvenile Red-eared Slider requiring a large aquatic enclosure with a good filter.',
    photoUrl: null,
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
  ) {}

  async seedIfFresh(): Promise<void> {
    const existingTypes = await this.typeRepo.count();
    if (existingTypes > 0) {
      this.logger.log('Database already seeded – skipping.');
      return;
    }

    this.logger.log('Fresh database detected – seeding sample data…');

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
