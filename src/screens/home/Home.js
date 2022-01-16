import Header from "../../common/header/Header";
import React,{Component} from 'react';
import './Home.css';
import { withStyles } from "@material-ui/core/styles";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import moviesData from '../../common/moviesData';
import { Checkbox, ListItemText } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { Input,InputLabel,Select } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MenuItem,TextField } from '@material-ui/core';
import genre from '../../common/genre';
import artists from '../../common/artists';
  const styles = theme=>({
  root1: {
    backgroundColor: theme.palette.background.paper,
    margin:'2%',
    paddingRight:'20%',
  },
  root: {
    
    backgroundColor: theme.palette.background.paper,
    
  },
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin:'0',
    overflow:'scroll',
    height:'250',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  
  imageList_Released: {
    width: 800,
    height: 350,
    overflow: 'visible',
    
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  
  titleMovie: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  
  heading:{
    color:theme.palette.primary.light,
  },
});
class Home extends Component {
  constructor() {
    super();
    this.state = {
      nameOfMovie: "",
      allGenres: [{}],
      allArtists: [{}],
      upcoming: [{}],
      released: [{}],
      begDate: "",
      lastDate: "",
      currentGenre: [],
      currentArtist: [],
     
    }
    
  }
  componentDidMount() {
    this.setState({ upcoming:moviesData})
    this.setState({ released: moviesData });
    this.setState({ allGenres:genre });
    this.setState({ allArtists:artists });
     
  }
  
  
  //This controls the state of the movie name
  nameSelectorHandler = event => {
    this.setState({ nameOfMovie: event.target.value });
  }
  //This controls the state of the genre
  genreHandler = event => {
    this.setState({ currentGenre: event.target.value });
  }
  //This controls the state of the artists
  artistsHandler = event => {
    this.setState({ currentArtist: event.target.value });
  }
  //This controls the state of the start date of the movie
  begDateHandler = event => {
    this.setState({ begDate: event.target.value });
  }
//  This controls the state of the last date of the the movie
  lastDateHandler = event => {
    this.setState({ lastDate: event.target.value });
  }
 
//This controls the functionality of searching for the movie as required by the user
  applyingCurrentChanges = () => {
    var SpecificMovie = moviesData.filter(item => (item.title.includes(this.state.nameOfMovie) || item.artists.includes(this.state.currentArtist) || item.genres.includes(this.state.currentGenre)));
    // console.log(SpecificMovie);
    this.setState({released:SpecificMovie});
   }
  render() {
    const { classes } = this.props;

    return (
      <>

     { /*  Header Component */}
      { /*  Header Component */}
      <Header />

      { /* Heading */ }
      <div className="heading">
      <span> Upcoming Movies </span>
      </div>
        
    {/*Upcoming Movies List*/}
      <div className={classes.root}>
      <ImageList cols={5}  rowHeight={250} className={classes.imageList}>
      {this.state.upcoming.slice(0,6).map(upcomingItem => (
        <ImageListItem key={upcomingItem.id}>
          <img src={upcomingItem.poster_url} alt={upcomingItem.title} style={{cursor:"pointer"}} />
          <ImageListItemBar title={upcomingItem.title} />
        </ImageListItem>
      ))}
    </ImageList>
        </div>
       { /* Container*/ }
       
        <div className="flex-container">
        {/*Released Movies List */}
          <div className="left">
          <div className={classes.root1}>
            <ImageList rowHeight={350} cols={3} gap={30} className={classes.imageList_Released}>
            <ImageListItem key={moviesData.id} cols={4} gap={30} className={classes.imagecellHeight} style={{ height: 'auto' }}>
           </ImageListItem>
            {this.state.released.slice(0,4).map(releasedItem => (
                <ImageListItem key={releasedItem.id}>
                  <img src={releasedItem.poster_url} alt={releasedItem.title} style={{cursor:"pointer"}}  />
                  <ImageListItemBar title={releasedItem.title}
                    subtitle={<span>Release Date: {new Date(releasedItem.release_date).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}</span>}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            </div>
          </div>

         { /* Movie Filter Card */}
         { /* Movie Filter Card  Working*/}
          <div className="right">

            <Card>
              <CardContent>
               <Typography className={classes.titleMovie} color="textPrimary">
                 FIND MOVIES BY:
                </Typography>
                 <br></br>
                
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
                  <Input id="movieName" value={this.state.nameOfMovie} onChange={this.nameSelectorHandler} />
                </FormControl>
               
                <br></br>
               
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">Genre</InputLabel>
                  <Select multiple input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(',')} value={this.state.currentGenre}
                    onChange={this.genreHandler}>
                    {this.state.allGenres.map(item => (
                      <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={this.state.currentGenre.indexOf(item.name) > - 1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              
                <br></br>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                  <Select multiple input={<Input id="select-multiple-checkbox" />} renderValue={specific => specific.join(',')} value={this.state.currentArtist}
                    onChange={this.artistsHandler}>
                    {this.state.allArtists.map(item => (<MenuItem key={item.id} value={item.first_name + " " + item.last_name}>
                        <Checkbox checked={this.state.currentArtist.indexOf(item.first_name + " " + item.last_name) > - 1} />
                        <ListItemText primary={item.first_name + " " + item.last_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br></br>
                <FormControl className={classes.formControl}>
                  <TextField id="begDate" label="Release Date Start" value={this.state.begDate} type="date" InputLabelProps={{ shrink: true }}
                    onChange={this.begDateHandler}
                  />
                </FormControl>
                <br></br>
                <FormControl className={classes.formControl}>
                  <TextField id="lastDate" label="Release Date End" value={this.state.lastDate} type="date" InputLabelProps={{ shrink: true }}
                    onChange={this.lastDateHandler}
                  />
                </FormControl><br /><br />
                <FormControl className={classes.formControl}>
                  <Button onClick={() => this.applyingCurrentChanges()} variant="contained" color="primary">
                    APPLY
                    </Button>
                </FormControl>
              </CardContent>
            </Card>
          
          </div>
        </div>
       
      </>
      
    );
  }
}
export default withStyles(styles)(Home)
