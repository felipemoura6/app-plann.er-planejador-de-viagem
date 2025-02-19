import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps{
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventsStartAndEndDate: (dates: DateRange | undefined) => void
    eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({isGuestsInputOpen, closeGuestsInput, openGuestsInput, setDestination, setEventsStartAndEndDate, eventStartAndEndDates}: DestinationAndDateStepProps){

    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null


    function openDatePicker(){
        return setIsDatePickerOpen(true)
    }

    function closeDatePicker(){
        return setIsDatePickerOpen(false)
    }

    return(
        <div className="flex items-center bg-zinc-900 h-16 rounded-xl p-4 text-sm shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='text-zinc-400 size-5'/>
              <input
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-zinc-100 placeholder-zinc-400 text-lg outline-none flex-1"
              disabled={isGuestsInputOpen}
              onChange={event => setDestination(event.target.value)}
              />  
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='flex items-center gap-2 text-left w-[240px]'>
              <Calendar className='text-zinc-400 size-5'/>
                <span className="text-zinc-400 text-lg w-40 flex-1">
                    {displayedDate || 'Quando'}
                </span>
            </button>

            {isDatePickerOpen && (<div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className='rounded-lg py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Selecione a data</h2>
                        <button type='button' onClick={closeDatePicker}>
                            <X className='size-5 text-zinc-400'/>
                        </button>
                        </div>
                    </div>
                    
                    <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventsStartAndEndDate}/>
                    
                    </div>
                </div>
            )}

            <div className='w-px h-6 bg-zinc-800'></div>

            {isGuestsInputOpen?(
                <Button onClick={closeGuestsInput} variant={'secondary'} size="default">
                    Alterar Data/Local
                    <Settings2 className="size-5"/>    
                </Button>
            ):(
                <Button onClick={openGuestsInput} variant={'primary'} size="default">
                    Continuar
                    <ArrowRight className="size-5"/>    
                </Button>
            )}
          </div>
    )
}