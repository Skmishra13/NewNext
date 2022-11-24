import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(contex) {
//   const req = contex.req;
//   const res = contex.res;
//   return { props: { meetups: DUMMY } };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Skmishra:Ak8ORlZe2k4CNuMY@apireact.ytdosin.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          id: meetup._id.toString(),
          address: meetup.address,
          description: meetup.description,
        };
      }),
    },
    revalidate: 10,
  };
}
export default HomePage;
