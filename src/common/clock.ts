class Clock {
    now(): Date {
        return new Date();
    }

    createDatetime(datetime: string | number): Date{
        return new Date(datetime);
    }
}

export default Clock;