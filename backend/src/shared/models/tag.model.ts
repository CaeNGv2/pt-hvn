export class TagModel {
  id: number;
  name: string;

  constructor(data: Partial<TagModel> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
  }

  static fromJson(json: Record<string, unknown>): TagModel {
    return new TagModel({
      id: json['id'] as number,
      name: json['name'] as string,
    });
  }

  toJson(): Record<string, unknown> {
    return { id: this.id, name: this.name };
  }
}
