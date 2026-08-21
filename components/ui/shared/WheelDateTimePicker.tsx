'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { WheelPicker } from './WheelPicker'
import { Switch } from './Switch'
import { Calendar, Clock, Volume2, Sparkles } from 'lucide-react'

export interface WheelDateTimePickerProps {
    value?: string // ISO string
    onChange: (isoString: string) => void
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

const currentYearNum = new Date().getFullYear()
const YEARS = Array.from({ length: 8 }, (_, i) => String(currentYearNum + i))

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
    disabled = false,
    className = '',
}) => {
    // Parse incoming date or default to tomorrow at 9:00 AM
    const initialDate = useMemo(() => {
        if (value) {
            const d = new Date(value)
            if (!isNaN(d.getTime())) return d
        }
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(9, 0, 0, 0)
        return tomorrow
    }, [value])

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
    useEffect(() => {
        const h12 = parseInt(hour, 10) || 12
        let h24 = h12
        if (period === 'PM' && h12 < 12) h24 = h12 + 12
        if (period === 'AM' && h12 === 12) h24 = 0

        const m = parseInt(minute, 10) || 0
        const d = parseInt(day, 10) || 1
        const mo = parseInt(month, 10) || 0
        const y = parseInt(year, 10) || currentYearNum

        const newDate = new Date(y, mo, d, h24, m, 0)
        if (!isNaN(newDate.getTime())) {
            const iso = newDate.toISOString()
            if (iso !== value) {
                onChange(iso)
            }
        }
    }, [month, day, year, hour, minute, period, onChange, value])

    // Format human-readable preview
    const formattedPreview = useMemo(() => {
        const monthObj = MONTHS.find((m) => m.value === month)
        const monthName = monthObj ? monthObj.full : 'January'
        return `${monthName} ${day}, ${year} at ${hour}:${minute} ${period}`
    }, [month, day, year, hour, minute, period])

    // Quick Presets
    const setPreset = useCallback(
        (daysAhead: number, targetHour24: number) => {
            const d = new Date()
            d.setDate(d.getDate() + daysAhead)
            d.setHours(targetHour24, 0, 0, 0)

            setMonth(String(d.getMonth()))
            setDay(String(d.getDate()))
            setYear(String(d.getFullYear()))

            const p = targetHour24 >= 12 ? 'PM' : 'AM'
            const h12 = targetHour24 % 12 || 12
            setHour(h12 < 10 ? `0${h12}` : String(h12))
            setMinute('00')
            setPeriod(p)
        },
        []
    )

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Formatted Date & Time Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-accent/10 border border-accent/30 text-fg">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-accent uppercase tracking-wider">
                        <Clock size={12} />
                        <span>Scheduled Release Time</span>
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
            </div>

            {/* Dual Wheel Pickers: Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Date Drums (Month / Day / Year) */}
                <div className="p-2 rounded-2xl border border-sec/20 bg-bg/60 space-y-1.5">
                    <div className="flex items-center gap-1 px-1 text-[10px] font-mono text-sec uppercase tracking-wider">
                        <Calendar size={11} className="text-accent" />
                        <span>Date (M / D / Y)</span>
                    </div>
                    <div className="flex items-stretch justify-center gap-1">
                        {/* Month */}
                        <WheelPicker
                            options={MONTHS.map((m) => ({ label: m.label, value: m.value }))}
                            value={month}
                            onValueChange={setMonth}
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
                            onValueChange={setDay}
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
                            onValueChange={setYear}
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
                    <div className="flex items-stretch justify-center gap-1 items-center">
                        {/* Hour */}
                        <WheelPicker
                            options={HOURS}
                            value={hour}
                            onValueChange={setHour}
                            visibleCount={5}
                            itemHeight={32}
                            sound={sound}
                            disabled={disabled}
                            className="w-12 sm:w-14 border-0 bg-transparent"
                            aria-label="Hour"
                        />
                        <span className="text-sec font-mono font-bold text-sm">:</span>
                        {/* Minute */}
                        <WheelPicker
                            options={MINUTES}
                            value={minute}
                            onValueChange={setMinute}
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
                            onValueChange={setPeriod}
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
