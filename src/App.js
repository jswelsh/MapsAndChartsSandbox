import { TechnologiesGraph } from './TechnologiesGraph' 
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  App: {
    textAlign: "center"
  },
  }));

function App() {
  const classes = useStyles();
  return (
    <div className="classes.App">
      <TechnologiesGraph/>
    </div>
  );
}

export default App;
