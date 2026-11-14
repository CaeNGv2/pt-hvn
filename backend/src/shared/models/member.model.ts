export class MemberModel {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  address: string | null;
  joinedAt: string;
  isActive: boolean;

  constructor(data: Partial<MemberModel> = {}) {
    this.id = data.id ?? 0;
    this.fullName = data.fullName ?? '';
    this.email = data.email ?? '';
    this.phone = data.phone ?? null;
    this.address = data.address ?? null;
    this.joinedAt = data.joinedAt ?? new Date().toISOString();
    this.isActive = data.isActive ?? true;
  }

  get displayName(): string {
    return this.fullName || this.email;
  }

  static fromJson(json: Record<string, unknown>): MemberModel {
    return new MemberModel({
      id: json['id'] as number,
      fullName: json['fullName'] as string,
      email: json['email'] as string,
      phone: json['phone'] as string | null,
      address: json['address'] as string | null,
      joinedAt: json['joinedAt'] as string,
      isActive: json['isActive'] as boolean,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      joinedAt: this.joinedAt,
      isActive: this.isActive,
    };
  }
}
