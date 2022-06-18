import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetUpList from '../components/meetups/MeetupList';
 
const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'Nice Meetup',
        image: 'https://images.unsplash.com/1/bag-and-hands.jpg',
        address: '123, Main Street, Nice City, NY 201001',
        description: 'This is a nice meetup'
    },
    {
        id: 'm2',
        title: 'Good Meetup',
        image: 'https://images.unsplash.com/photo-1598908314766-3e3ce9bd2f48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        address: '456, Main Street, Nice City, NY 201001',
        description: 'I love the company of people'
    },
    {
        id: 'm3',
        title: 'Another Meetup',
        image: 'https://images.unsplash.com/photo-1597022428451-df97175c708c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
        address: '945, Main Street, Nice City, NY 201001',
        description: 'I had a nice party there after so long'
    },
];

function HomePage (props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Easy UI to set your regular meetups here"></meta>
            </Head>
            <MeetUpList meetups={props.meetups}/>
        </Fragment>
    );
}

// export async function getServerSideProps(context){
//     const res = context.res;
//     const req = context.req;
//     console.log(res, req);
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }
// export async function getStaticProps(){
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://ved333:mongodbmvp@cluster0.54ykv.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return{
        props: {
            meetups: meetups.map( (meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }        
}

export default HomePage;