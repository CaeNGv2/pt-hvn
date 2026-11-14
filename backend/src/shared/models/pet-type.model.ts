export class PetTypeModel {
  id: number;
  name: string;

  constructor(data: Partial<PetTypeModel> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
  }

  static fromJson(json: Record<string, unknown>): PetTypeModel {
    return new PetTypeModel({
      id: json['id'] as number,
      name: json['name'] as string,
    });
  }

  toJson(): Record<string, unknown> {
    return { id: this.id, name: this.name };
  }
}
