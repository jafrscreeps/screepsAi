import {CreepRole} from './CreepRole';


export type CreepCollector<T> = Record<CreepRole, ReadonlyArray<T>>
