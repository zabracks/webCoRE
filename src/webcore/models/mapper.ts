import { mapModel } from 'smartapp-api/ModelMapper';
import * as Remote from "smartapp-api/models";
import { Category, PistonListing } from '.';
import { None, some } from '../utils/option';

export const mappers = {
    piston: mapModel((remote: Remote.PistonListing): PistonListing => ({
        name: remote.name,
        pistonId: remote.id,
        categoryId: remote.meta && remote.meta.c ? parseInt(remote.meta.c) : undefined,
        metadata: remote.meta ? {
            active: remote.meta.a,
            lastExecuted: remote.meta.t ? some(remote.meta.t) : None,
            nextScheduled: remote.meta.n ? some(remote.meta.n) : None,
            statusText: remote.meta.s.new ? some(remote.meta.s.new) : None,
            automaticStatus: remote.meta.s.autoNew ? some(remote.meta.s.autoNew) : None,
        } : {
            active: false,
            lastExecuted: None,
            nextScheduled: None,
            statusText: None,
            automaticStatus: None,
        }
    }), local => ({
        name: local.name,
        id: local.pistonId,
        meta: {
            a: local.metadata.active,
            t: local.metadata.lastExecuted.case === "some" ? local.metadata.lastExecuted.val : 0,
            n: local.metadata.nextScheduled.case === "some" ? local.metadata.nextScheduled.val : 0,
            s: {

            },
            c: local.categoryId ? local.categoryId.toString() : null,
            z: ""
        }
    })),
    category: mapModel(
        (remote: Remote.Category): Category => ({
            categoryId: remote.i,
            name: remote.n,
            display: {
                tileSize: (t => {
                    if(t.startsWith("t")) return "tile";
                    if(t.startsWith("m")) return "medium";
                    if(t.startsWith("l")) return "large";
                    return undefined;
                })(remote.t),
                details: remote.t.includes("d"),
                hidden: remote.t.includes("h"),
            }
        }),
        (local) => ({
                t: (local.display.tileSize ? local.display.tileSize[0] : "") + (local.display.details ? "d" : "") + (local.display.hidden ? "h" : ""),
                n: local.name,
                i: local.categoryId,
        }),
    ),
};
