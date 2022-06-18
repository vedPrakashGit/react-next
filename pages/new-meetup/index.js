import { Fragment } from 'react';
import Head  from 'next/head';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
function MeetUpForm(){
    const router = useRouter();

    async function addMeetUpHandler(enteredData){
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        console.log(data);

        router.push('/');
    }

    return(
        <Fragment>
            <Head>
                <title>Add New Meetup</title>
                <meta name="description" content="Add your meetup here and connect with your loved one."></meta>
            </Head>
            <NewMeetUpForm onAddMeetup={addMeetUpHandler}/>
        </Fragment>
    )
}
export default MeetUpForm;