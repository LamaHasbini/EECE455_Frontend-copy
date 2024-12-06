import "../styles/Timeline.css"; 

interface Event {
  date: string;
  link: string;
  label: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="timeline-container">
      <div className="timeline">
        {events.map((event, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-date">{event.date}</div>
            <div className="timeline-button">
              <button onClick={() => window.location.href = event.link}>
                {event.label}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;