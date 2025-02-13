import { Field, InputType } from "@nestjs/graphql";
import { IsEthereumAddress } from "class-validator";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: false, description: "지갑 주소" })
  @IsEthereumAddress()
  address!: string;
}
