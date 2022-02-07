import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "../dtos/create-project.dto";
import { Project, ProjectDocument } from "../project.schema";

export class CreateProjectCommand {
    readonly form: CreateProjectDto;
    constructor(form: CreateProjectDto) {
        this.form = form;
    }
}

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand>{
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(command: CreateProjectCommand): Promise<any> {
        const createdProj = new this.projectModel(command.form);

        return createdProj.save();
    }
}