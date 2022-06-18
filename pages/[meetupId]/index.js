import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetUpDetail from "../../components/meetups/MeetUpDetail";
function MeetUpDetails(props){
    console.log(props);
    return (
        // <MeetUpDetail 
        // id="m1"
        // image="https://images.unsplash.com/1/bag-and-hands.jpg" 
        // title="Nice Meetup" 
        // description="This is a nice meetup" 
        // address="123, Main Street, Nice City, NY 201001"/>
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>                
                <meta name="description" content={props.meetupData.description}></meta>
            </Head>
            <MeetUpDetail
            id={props.meetupData.id}
            image={props.meetupData.image}
            title={props.meetupData.title}
            description={props.meetupData.description}
            address={props.meetupData.address}/>
        </Fragment>
    );
}

// export async function getStaticPaths(){
//     return {
//         fallback: false,
//         paths: [
//             {
//                 params: {
//                     meetupId: 'm1'
//                 }
//             },
//             {
//                 params: {
//                     meetupId: 'm2'
//                 }
//             },
//             {
//                 params: {
//                     meetupId: 'm3'
//                 }
//             },
//         ]
//     }
// }

// export async function getStaticProps(context){
//     const meetupId = context.params.meetupId;
//     console.log(meetupId);
//     return {
//         props: {
//             meetupData: {
//                 id: meetupId,
//                 image: "https://images.unsplash.com/1/bag-and-hands.jpg",
//                 title: "Nice Meetup" ,
//                 description: "This is a nice meetup" ,
//                 address: "123, Main Street, Nice City, NY 201001"
//             }
//         }
//     }
// }

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://ved333:mongodbmvp@cluster0.54ykv.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({}, { _id: 1}).toArray();

    client.close();

    return{
        fallback: 'blocking',
        paths: meetups.map( (meetup) => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect('mongodb+srv://ved333:mongodbmvp@cluster0.54ykv.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedData = await meetupCollection.findOne({ _id: ObjectId(meetupId)});
    console.log(selectedData);
    
    client.close();
    
    return{
        props: {
            meetupData: {
                id: selectedData._id.toString(),
                title: selectedData.title,
                address: selectedData.address,
                description: selectedData.description,
                image: selectedData.image,
            }
                
        }
    }
}

export default MeetUpDetails;