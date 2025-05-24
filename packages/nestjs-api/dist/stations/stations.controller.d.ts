import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    create(createStationDto: CreateStationDto): Promise<import("./entities/station.entity").Station>;
    findAll(): Promise<import("./entities/station.entity").Station[]>;
    findOne(id: string): Promise<import("./entities/station.entity").Station>;
}
