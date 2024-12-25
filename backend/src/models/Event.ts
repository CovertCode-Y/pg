import { Schema, model, Document } from "mongoose";

interface IEvent extends Document {
  eventid: string | number;
  iyear: number;
  imonth: number;
  iday: number;
  country_txt: string;
  region_txt: string;
  city: string;
  latitude?: number;
  longitude?: number;
  attacktype1_txt: string;
  targtype1_txt: string;
  target1: string;
  gname: string;
  weaptype1_txt: string;
  nkill: number;
  nwound: number;
}

const eventSchema = new Schema<IEvent>(
  {
    eventid: {
      type: Schema.Types.Mixed,
      required: true,
      unique: true,
    },
    iyear: {
      type: Number,
      required: true,
    },
    imonth: {
      type: Number,
      required: true,
    },
    iday: {
      type: Number,
      required: true,
    },
    country_txt: {
      type: String,
      required: true,
    },
    region_txt: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    attacktype1_txt: {
      type: String,
      required: true,
    },
    targtype1_txt: {
      type: String,
      required: true,
    },
    target1: {
      type: String,
      required: true,
    },
    gname: {
      type: String,
      required: true,
    },
    weaptype1_txt: {
      type: String,
      required: true,
    },
    nkill: {
      type: Number,
      required: true,
    },
    nwound: {
      type: Number,
      required: true,
    },
  },
);

export const Event = model<IEvent>("Event", eventSchema, "events");
