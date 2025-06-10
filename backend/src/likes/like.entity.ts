import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Likes {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  wallet_address: string;
}
