enum TimeUnits {
  YEAR = 31_536_000_000,
  MONTH = 2_678_400_000,
  WEEK = 604_800_000,
  DAY = 86_400_000,
  HOUR = 3_600_000,
  MINUTE = 60_000,
  SECOND = 1000,
  MILLISECOND = 1
}

type TimeResolvable = Date | number | Time;
type HumanUnit = `${Lowercase<keyof typeof TimeUnits>}s`;

export class Time {
  public static Units = TimeUnits;
  private date: Date;

  constructor(initialDate: TimeResolvable = new Date()) {
    this.date = Time.resolveDate(initialDate);
  }

  private static resolveDate(time: TimeResolvable): Date {
    return time instanceof Date
      ? time
      : time instanceof Time
        ? time.getDate()
        : new Date(time);
  }

  private static getUnit(unit: HumanUnit): TimeUnits {
    return TimeUnits[unit.toUpperCase().slice(0, -1) as keyof typeof TimeUnits];
  }

  public static now(): Time {
    return new Time();
  }

  public static add(time: TimeResolvable, amount: number, unit: HumanUnit = 'milliseconds'): Time {
    return new Time(Time.resolveDate(time).getTime() + (amount * Time.getUnit(unit)));
  }

  public add(amount: number, unit: HumanUnit = 'milliseconds'): this {
    this.date.setMilliseconds(this.date.getTime() + (amount * Time.getUnit(unit)));
    return this;
  }

  public static subtract(time: TimeResolvable, amount: number, unit: HumanUnit = 'milliseconds'): Time {
    return Time.add(time, -amount, unit);
  }

  public subtract(amount: number, unit: HumanUnit = 'milliseconds'): this {
    return this.add(-amount, unit);
  }

  public static equals(timeA: TimeResolvable, timeB: TimeResolvable): boolean {
    return Time.resolveDate(timeA).getTime() === Time.resolveDate(timeB).getTime();
  }

  public equals(time: TimeResolvable): boolean {
    return this.date.getTime() === Time.resolveDate(time).getTime();
  }

  public static in(amount: number, unit: HumanUnit = 'milliseconds'): Time {
    return new Time(Date.now() + (amount * Time.getUnit(unit)));
  }

  public static isWeekend(time: TimeResolvable): boolean {
    const weekDay = Time.resolveDate(time).getUTCDate();
    return weekDay === 0 || weekDay === 6;
  }

  public isWeekend(): boolean {
    return Time.isWeekend(this);
  }

  public static between(timeA: TimeResolvable, timeB: TimeResolvable): number {
    return Math.abs(Time.resolveDate(timeA).getTime() - Time.resolveDate(timeB).getTime());
  }

  public static gt(timeA: TimeResolvable, timeB: TimeResolvable): boolean {
    return Time.resolveDate(timeA).getTime() > Time.resolveDate(timeB).getTime();
  }

  public gt(time: TimeResolvable): boolean {
    return this.getTime() > Time.resolveDate(time).getTime();
  }

  public static lt(timeA: TimeResolvable, timeB: TimeResolvable): boolean {
    return Time.resolveDate(timeA).getTime() < Time.resolveDate(timeB).getTime();
  }

  public lt(time: TimeResolvable): boolean {
    return this.getTime() < Time.resolveDate(time).getTime();
  }

  public getDate(): Date {
    return this.date;
  }

  public getTime(): number {
    return this.date.getTime();
  }
}

const b = Time.in(Time.Units.DAY * 4).add(10, 'minutes').add(6969).isWeekend();
const c = new Time().add(4, 'months').subtract(10, 'days').getDate();
const d = Time.add(Time.in(4, 'years'), 10, 'milliseconds').add(Time.Units.DAY).equals(Time.now());

