import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "src/projects/project.schema";
import { Version } from "../version.schema";

export class GetAllVersionsQuery {
    constructor(readonly projectId: string) { }
}

@QueryHandler(GetAllVersionsQuery)
export class GetAllVersionsQueryHandler implements ICommandHandler<GetAllVersionsQuery>{
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(command: GetAllVersionsQuery): Promise<Version[]> {
        const project = await this.projectModel.findById(command.projectId).populate('versions');
        return project.versions;
    }
}