import * as React from "react";
import DataService from "../../service/DataService";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import styles from "../components/EventCategories/EventCategories.module.scss";

export default class EventApp extends React.Component<
  {},
  { error: {}; cats: []; events: []; clickedCats: number[] }
> {
  private DataService = new DataService();
  constructor(props) {
    super(props);
    this.state = { cats: [], events: [], clickedCats: [] };
  }
  public componentDidMount = async () => {
    const cats = await this.DataService.getCategories();
    const events = await this.DataService.getEvents();

    this.setState(prevState => ({
      ...prevState,
      cats,
      events
    }));
  };

  render() {
    const categories = this.state.cats.map(cat => (
      <Category
        key={`cat-${cat.id}`}
        category={cat}
        events={this.state.events.filter(event => event.catId === cat.id)}
      />
    ));
    const events = this.state.events.map(ev => (
      <li key={ev.title}>{ev.title}</li>
    ));
    // const events = this.state.events.map(e => (
    //   <li key={`${e.tile}-${e.id}`}>{e.title}</li>
    // ));

    if (!!this.state.error) {
      return <div>{this.state.error}</div>;
    }

    return <div>{categories}</div>;
  }

  private onClickCat = async (catId): Promise<void> => {
    try {
      // const events = await this.DataService.getEvents();
      console.log(...this.state.clickedCats);
      const clickedCats =
        this.state.clickedCats.indexOf(catId) > -1
          ? [...this.state.clickedCats.filter(_catId => _catId === catId)]
          : [...this.state.clickedCats, catId];

      this.setState(prevState => ({
        ...prevState,
        showEvents: !prevState.showEvents,
        clickedCats
      }));
    } catch (error) {
      this.setSate({ error });
    }
  };
}

export class Category extends React.Component<
  { events: []; category: {} },
  { showEvents: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      showEvents: false
    };
  }
  render(): JSX.Element {
    return (
      <div>
        <h2 onClick={() => this.toggleEvents()}>{this.props.category.title}</h2>
        {this.state.showEvents && <Events events={this.props.events} />}
      </div>
    );
  }

  private toggleEvents = (): void => {
    console.log(this.props.events);
    this.setState(prevState => ({
      ...prevState,
      showEvents: !prevState.showEvents
    }));
  };
}

export class Events extends React.Component<{ events: [] }> {
  constructor(props) {
    super(props);
  }

  render() {
    const { events } = this.props;
    return (
      <ul className="list">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          //transitionAppearTimeout={250}
          transitionEnter={false}
          transitionLeave={false}
        >
          {events.map((event, i) => {
            return (
              <li
                key={i}
                style={{ transitionDelay: `${i * 0.05}s` }}
                className="list-item"
              >
                {event.title}
              </li>
            );
          })}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

// <ReactCSSTransitionGroup transitionName="slide-up" transitionAppear={true}>
//   {items.map((item, i) => {
//     return (
//       <li
//         key={i}
//         className="list-item"
//         style={{ transitionDelay: `${i * 0.05}s` }}
//       >
//         {item}
//       </li>
//     );
//   })}
// </ReactCSSTransitionGroup>;
