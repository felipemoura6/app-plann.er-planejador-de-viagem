import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsModalProps{
    openGuestsModal: () => void
    emailsToInvite: string[]
    openConfirmationTripModal: () => void
}

export function InviteGuestsStep({openConfirmationTripModal, openGuestsModal, emailsToInvite}: InviteGuestsModalProps){
    return(
        <div className="flex items-center bg-zinc-900 h-16 rounded-xl p-4 text-sm shadow-shape gap-3">
            <button type="button" onClick={openGuestsModal} className="text-left flex items-center gap-2 flex-1">
            <UserRoundPlus className='text-zinc-400 size-5'/>
            {emailsToInvite.length>0?(
                <span className='text-zinc-100 text-lg flex-1'>{emailsToInvite.length} pessoa(s) convidada(s)</span>
            ):(
                <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
            )}
            </button>

            <div className='w-px h-6 bg-zinc-800'></div>

            <Button onClick={openConfirmationTripModal} variant={'primary'} size="default">
                Confirmar viagem!
                <ArrowRight className='text-lime-950 size-5'/>
            </Button>
        </div>
    )
}