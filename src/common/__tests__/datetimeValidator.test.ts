import {isFromBeforeTo, isValidISODate}  from "./datetimeValidator";

describe("isValidISODate", () => {
  it.each([
    ["2025-08-16T14:30:00.000Z"],
    ["2021-01-01T00:00:00.000Z"],
  ])("given a valid ISO datetime %s, should return true", (datetime) => {
    const actual = isValidISODate(datetime);
    expect(actual).toEqual(true);
  });

  it.each([
    ["invalid date"],
    ["2025-08-16"],
    ["2021-02-30T00:00:00.000Z"],
    ["2021-01-30T25:00:00.000Z"],
  ])("given an invalid datetime %s, should return false", (datetime) => {
    const actual = isValidISODate(datetime);
    expect(actual).toEqual(false);
  });
});


describe("isFromBeforeTo", () => {
  it.each([
    [new Date("2025-08-16T14:30:00.000Z"), new Date("2025-08-16T14:30:01.000Z")],
    [new Date("2025-08-16T00:00:00.000Z"), new Date("2025-08-17T00:00:00.000Z")],
  ])("given From %s is before To %s, should return true", (from: Date, to: Date) => {
    const actual = isFromBeforeTo(from, to);
    expect(actual).toEqual(true);
  });

  it.each([
    [new Date("2025-08-16T14:30:00.000Z"), new Date("2025-08-16T14:30:00.000Z")],
    [new Date("2025-08-18T00:00:00.000Z"), new Date("2025-08-17T00:00:00.000Z")],
  ])("given From %s is after or equal to To %s, should return false", (from: Date, to: Date) => {
    const actual = isFromBeforeTo(from, to);
    expect(actual).toEqual(false);
  });
});