import { MongoClient, ObjectId } from "mongodb";
const MeetupDetails = (props) => {
  return (
    <section className="detail">
      <img src={props.meetupData.image} alt="1st meetUp" />
      <h1>{props.meetupData.title}</h1>
      <address>{props.meetupData.address}</address>
      <p>{props.meetupData.description}</p>
    </section>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Skmishra:Ak8ORlZe2k4CNuMY@apireact.ytdosin.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(contex) {
  const meetupId = contex.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://Skmishra:Ak8ORlZe2k4CNuMY@apireact.ytdosin.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedData = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  return {
    props: {
      meetupData: {
        id: selectedData._id.toString(),
        title: selectedData.title,
        address: selectedData.address,
        image: selectedData.image,
        description: selectedData.description,
      },
    },
  };
}
export default MeetupDetails;
