import classes from './MeetUpDetail.module.css';

function MeetUpDetail(props){
    console.log(props.id)
    return(
        <section className={classes.detail}>
            <img src={props.image} alt={props.title}></img>
            <h3>{props.title}</h3>
            <small><i>{props.address}</i></small>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetUpDetail;