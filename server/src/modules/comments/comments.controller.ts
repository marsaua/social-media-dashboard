import { Controller } from "@nestjs/common";
import { CommentsService } from "src/modules/comments/providers/comments.service";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
}
