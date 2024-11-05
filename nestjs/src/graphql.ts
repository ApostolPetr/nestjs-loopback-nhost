
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Ping {
    greeting: string;
    url: string;
}

export abstract class IQuery {
    abstract ping(): Nullable<Ping> | Promise<Nullable<Ping>>;
}

type Nullable<T> = T | null;
