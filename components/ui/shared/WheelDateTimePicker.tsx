'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { WheelPicker } from './WheelPicker'
import { Switch } from './Switch'
import { Calendar, Clock, Volume2, Sparkles, RotateCcw } from 'lucide-react'

export interface WheelDateTimePickerProps {
    value?: string // ISO string
    onChange: (isoString: string) => void
    label?: string
    mode?: 'published' | 'scheduled'
    disabled?: boolean
    className?: string
}

const MONTHS = [
    { label: 'Jan', value: '0', full: 'January' },
    { label: 'Feb', value: '1', full: 'February' },
    { label: 'Mar', value: '2', full: 'March' },
    { label: 'Apr', value: '3', full: 'April' },
    { label: 'May', value: '4', full: 'May' },
    { label: 'Jun', value: '5', full: 'June' },
    { label: 'Jul', value: '6', full: 'July' },
    { label: 'Aug', value: '7', full: 'August' },
    { label: 'Sep', value: '8', full: 'September' },
    { label: 'Oct', value: '9', full: 'October' },
    { label: 'Nov', value: '10', full: 'November' },
    { label: 'Dec', value: '11', full: 'December' },
]

// Allow wide range of years for backdating and future scheduling (2015 to 2038)
const YEARS = Array.from({ length: 24 }, (_, i) => String(2015 + i))

const HOURS = Array.from({ length: 12 }, (_, i) => {
    const h = i + 1
    return h < 10 ? `0${h}` : String(h)
})

const MINUTES = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : String(i)))

const PERIODS = ['AM', 'PM']

function daysInMonth(monthIndex: number, year: number): number {
    return new Date(year, monthIndex + 1, 0).getDate()
}

export const WheelDateTimePicker: React.FC<WheelDateTimePickerProps> = ({
    value,
    onChange,
    label,
    mode = 'scheduled',
    disabled = false,
    className = '',
}) => {
    // Parse incoming date or default
    const initialDate = useMemo(() => {
        if (value) {
            const d = new Date(value)
            if (!isNaN(d.getTime())) return d
        }
        if (mode === 'published') return new Date()

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(9, 0, 0, 0)
        return tomorrow
    }, [value, mode])

    const [month, setMonth] = useState<string>(String(initialDate.getMonth()))
    const [day, setDay] = useState<string>(String(initialDate.getDate()))
    const [year, setYear] = useState<string>(String(initialDate.getFullYear()))

    const initialHours24 = initialDate.getHours()
    const initialPeriod = initialHours24 >= 12 ? 'PM' : 'AM'
    const initialHours12 = initialHours24 % 12 || 12
    const [hour, setHour] = useState<string>(initialHours12 < 10 ? `0${initialHours12}` : String(initialHours12))
    const [minute, setMinute] = useState<string>(
        initialDate.getMinutes() < 10 ? `0${initialDate.getMinutes()}` : String(initialDate.getMinutes())
    )
    const [period, setPeriod] = useState<string>(initialPeriod)
    const [sound, setSound] = useState<boolean>(true)

    // Sync external value changes into picker state
    useEffect(() => {
        if (!value) return
        const d = new Date(value)
        if (isNaN(d.getTime())) return

        const mStr = String(d.getMonth())
        const dStr = String(d.getDate())
        const yStr = String(d.getFullYear())
        const h24 = d.getHours()
        const pStr = h24 >= 12 ? 'PM' : 'AM'
        const h12 = h24 % 12 || 12
        const hStr = h12 < 10 ? `0${h12}` : String(h12)
        const minStr = d.getMinutes() < 10 ? `0${d.getMinutes()}` : String(d.getMinutes())

        setMonth(mStr)
        setDay(dStr)
        setYear(yStr)
        setHour(hStr)
        setMinute(minStr)
        setPeriod(pStr)
    }, [value])

    // Calculate valid days in selected month and year
    const maxDays = useMemo(() => {
        return daysInMonth(Number(month), Number(year))
    }, [month, year])

    const dayOptions = useMemo(() => {
        return Array.from({ length: maxDays }, (_, i) => String(i + 1))
    }, [maxDays])

    // Clamp day if month changes to shorter month
    useEffect(() => {
        if (Number(day) > maxDays) {
            setDay(String(maxDays))
        }
    }, [maxDays, day])

    // Emit updated ISO string whenever picker values change
    const updateDateTime = useCallback(
        (m: string, d: string, y: string, h: string, min: string, p: string) => {
            const h12 = parseInt(h, 10) || 12
            let h24 = h12
            if (p === 'PM' && h12 < 12) h24 = h12 + 12
            if (p === 'AM' && h12 === 12) h24 = 0

            const minuteNum = parseInt(min, 10) || 0
            const dayNum = parseInt(d, 10) || 1
            const monthNum = parseInt(m, 10) || 0
            const yearNum = parseInt(y, 10) || new Date().getFullYear()

            const newDate = new Date(yearNum, monthNum, dayNum, h24, minuteNum, 0)
            if (!isNaN(newDate.getTime())) {
                const iso = newDate.toISOString()
                onChange(iso)
            }
        },
        [onChange]
    )

    const handleMonthChange = (newMonth: string) => {
        setMonth(newMonth)
        updateDateTime(newMonth, day, year, hour, minute, period)
    }

    const handleDayChange = (newDay: string) => {
        setDay(newDay)
        updateDateTime(month, newDay, year, hour, minute, period)
    }

    const handleYearChange = (newYear: string) => {
        setYear(newYear)
        updateDateTime(month, day, newYear, hour, minute, period)
    }

    const handleHourChange = (newHour: string) => {
        setHour(newHour)
        updateDateTime(month, day, year, newHour, minute, period)
    }

    const handleMinuteChange = (newMinute: string) => {
        setMinute(newMinute)
        updateDateTime(month, day, year, hour, newMinute, period)
    }

    const handlePeriodChange = (newPeriod: string) => {
        setPeriod(newPeriod)
        updateDateTime(month, day, year, hour, minute, newPeriod)
    }

    // Format human-readable preview
    const formattedPreview = useMemo(() => {
        const monthObj = MONTHS.find((m) => m.value === month)
        const monthName = monthObj ? monthObj.full : 'January'
        return `${monthName} ${day}, ${year} at ${hour}:${minute} ${period}`
    }, [month, day, year, hour, minute, period])

    // Quick Presets
    const setPreset = useCallback(
        (daysDelta: number, targetHour24?: number, setExactNow = false) => {
            const d = new Date()
            if (setExactNow) {
                // exact now
            } else {
                d.setDate(d.getDate() + daysDelta)
                if (targetHour24 !== undefined) {
                    d.setHours(targetHour24, 0, 0, 0)
                }
            }

            const mStr = String(d.getMonth())
            const dStr = String(d.getDate())
            const yStr = String(d.getFullYear())
            const h24 = d.getHours()
            const pStr = h24 >= 12 ? 'PM' : 'AM'
            const h12 = h24 % 12 || 12
            const hStr = h12 < 10 ? `0${h12}` : String(h12)
            const minStr = d.getMinutes() < 10 ? `0${d.getMinutes()}` : String(d.getMinutes())

            setMonth(mStr)
            setDay(dStr)
            setYear(yStr)
            setHour(hStr)
            setMinute(minStr)
            setPeriod(pStr)

            onChange(d.toISOString())
        },
        [onChange]
    )

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Formatted Date & Time Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/10 border border-accent/30 text-fg">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-accent uppercase tracking-wider">
                        {mode === 'published' ? <Calendar size={12} /> : <Clock size={12} />}
                        <span>{label || (mode === 'published' ? 'Published Timestamp' : 'Scheduled Release Time')}</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-fg">
                        {formattedPreview}
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <Switch
                        checked={sound}
                        onCheckedChange={setSound}
                        ariaLabel="Mechanical tick sound"
                        className="scale-75 origin-right"
                    />
                    <Volume2 size={13} className={sound ? 'text-accent' : 'text-sec/40'} />
                </div>
            </div>

            {/* Quick Timing Presets */}
            <div className="grid grid-cols-3 gap-1.5">
                {mode === 'published' ? (
                    <>
                        <button
                            type="button"
                            onClick={() => setPreset(0, undefined, true)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer font-bold text-accent"
                        >
                            ⚡ Set to Now
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreset(-1, 9)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer"
                        >
                            Yesterday 9 AM
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreset(-7, 9)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer"
                        >
                            1 Week Ago
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={() => setPreset(1, 9)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer"
                        >
                            Tomorrow 9 AM
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreset(2, 12)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer"
                        >
                            In 2 Days Noon
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreset(7, 9)}
                            className="py-1.5 px-2 rounded-xl bg-fg/5 hover:bg-fg/10 border border-sec/15 text-[10px] font-mono text-sec hover:text-fg transition-all text-center cursor-pointer"
                        >
                            Next Week 9 AM
                        </button>
                    </>
                )}
            </div>

            {/* Dual Wheel Pickers: Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Date Drums (Month / Day / Year) */}
                <div className="p-2 rounded-2xl border border-sec/20 bg-bg/60 space-y-1.5">
                    <div className="flex items-center gap-1 px-1 text-[10px] font-mono text-sec uppercase tracking-wider">
                        <Calendar size={11} className="text-accent" />
                        <span>Date (Month / Day / Year)</span>
                    </div>
                    <div className="flex items-stretch justify-center gap-1">
                        {/* Month */}
                        <WheelPicker
                            options={MONTHS.map((m) => ({ label: m.label, value: m.value }))}
                            value={month}
                            onValueChange={handleMonthChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-16 sm:w-20 border-0 bg-transparent"
                            aria-label="Month"
                        />
                        {/* Day */}
                        <WheelPicker
                            options={dayOptions}
                            value={day}
                            onValueChange={handleDayChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-12 sm:w-14 border-0 bg-transparent"
                            aria-label="Day"
                        />
                        {/* Year */}
                        <WheelPicker
                            options={YEARS}
                            value={year}
                            onValueChange={handleYearChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-16 sm:w-18 border-0 bg-transparent"
                            aria-label="Year"
                        />
                    </div>
                </div>

                {/* Time Drums (Hour / Minute / Period) */}
                <div className="p-2 rounded-2xl border border-sec/20 bg-bg/60 space-y-1.5">
                    <div className="flex items-center gap-1 px-1 text-[10px] font-mono text-sec uppercase tracking-wider">
                        <Clock size={11} className="text-accent" />
                        <span>Time (H : M : Period)</span>
                    </div>
                    <div className="flex items-stretch justify-center gap-1">
                        {/* Hour */}
                        <WheelPicker
                            options={HOURS}
                            value={hour}
                            onValueChange={handleHourChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-12 sm:w-14 border-0 bg-transparent"
                            aria-label="Hour"
                        />
                        <span className="text-sec font-mono font-bold text-sm flex items-center">:</span>
                        {/* Minute */}
                        <WheelPicker
                            options={MINUTES}
                            value={minute}
                            onValueChange={handleMinuteChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-12 sm:w-14 border-0 bg-transparent"
                            aria-label="Minute"
                        />
                        {/* Period (AM/PM) */}
                        <WheelPicker
                            options={PERIODS}
                            value={period}
                            onValueChange={handlePeriodChange}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-14 sm:w-16 border-0 bg-transparent"
                            aria-label="AM or PM"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WheelDateTimePicker
