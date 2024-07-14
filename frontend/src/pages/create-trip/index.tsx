import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './inviteGuestsModal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTripPage() {

  const navigate = useNavigate();  
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false);
  const [isConfirmTripModalOpen, setisConfirmTripModalOpen] = useState<boolean>(false);
  const [emailsToInvite, setEmailsToInvite] = useState(['felipemoura@gmail.com']);

  const [destination, setDestination] = useState<string>('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [ownerEmail, setOwnerEmail] = useState<string>('')
  const [eventStartAndEndDates, setEventsStartAndEndDate] = useState<DateRange | undefined>()

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmationTripModal() {
    setisConfirmTripModalOpen(true)
  }

  function closeConfirmationTripModal() {
    setisConfirmTripModalOpen(false)
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    if(emailsToInvite.includes(email)){
      alert('Este email já está inserido')
      event.currentTarget.reset()
      return
    }
      

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailsList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailsList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='plann.er'/>
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje próxima sua viagem!</p>
        </div>
        
        <div className='space-y-4'>
            <DestinationAndDateStep
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            setEventsStartAndEndDate={setEventsStartAndEndDate}
            eventStartAndEndDates={eventStartAndEndDates}
            />

          {isGuestsInputOpen && (
            <InviteGuestsStep
            emailsToInvite={emailsToInvite}
            openConfirmationTripModal={openConfirmationTripModal}
            openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        
        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
        </div>

        {isGuestsModalOpen && (
            <InviteGuestsModal
            addEmailToInvite={addEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            removeEmailFromInvite={removeEmailFromInvite}/>
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
          closeConfirmationTripModal={closeConfirmationTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          />
        )}
    </div>
  )
}


