import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "src/modules/comments/dto/create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
