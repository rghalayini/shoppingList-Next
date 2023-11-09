import {useState} from 'react';
import { 
  TextField , 
  Button, 
  Typography, 
  Box,
  ListItem,
  ListItemText,
  Container, 
 } from '@mui/material';

const styles = {
  root:{
    marginTop: "40px",
  },
  inputBox:{
    marginTop: "30px",
  },
   input:{
    width: " 100%",
    marginBottom: "10px",
    backgroundColor: "white",
  },
  button: {
    margin: "20px 0",
    float: "right",
    width: "100%",
  },
  completed: {
    textDecoration: "line-through",
    opacity: 0.5,
  },
  deleteButton: {
    color: "#fff",
    backgroundColor: "#d9534f",
    borderColor: "#d43f3a",
    '&:hover': {
      background: "#B6534F",
    },
  },
};

type Props = {
  items: [Item]
}

type Item = {
  _id?: String;
  itemName: String;
}

export async function getServerSideProps() {
  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL }/api/getItems`);

    let items = await response.json();

    return {
      props: { items: JSON.parse(JSON.stringify(items)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Items(props: Props) {
  const [items, setItems] = useState<Item[]>(props.items);
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const deleteItem = async (itemId: string) => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL }/api/deleteItem?id=${itemId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      // window.location.reload();
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  const createItem = async (e: any) => {
    //e.preventDefault();
    if (itemName) {
      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL }/api/addItem`, {
          method: "POST",
          body: JSON.stringify({
            itemName,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const newItem = {
          _id: data.insertedId,
          itemName: itemName,
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setItemName("");
        setError("");
        setMessage("Post added successfully");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newItem = await createItem(itemName);
      if (newItem !== undefined) {
        setItems((prevItems) => [...prevItems, newItem]);
  
      }
    }
  };
  
  return (
    <Container maxWidth="sm" sx={styles.root} >
    <Typography variant="h4">Shopping List</Typography>
    <Box style={styles.inputBox}>
      <TextField 
            id="item-input" 
            label="Item" 
            variant="outlined"  
            placeholder="Insert your item"
            type="text"
            value={itemName}
            onChange={({ target }) => setItemName(target.value)}
            onKeyDown={handleKeyPress}
            sx={styles.input}

          />
      <Button type="submit" variant="contained" onClick={createItem} sx={styles.button}>Add</Button>
    </Box>
    <Box>
      {items.map(({ _id, itemName }, i) => (
        <Box key={i}>
          <ListItem 
            alignItems="flex-start"
            secondaryAction={
            <Button 
            color="error"
            onClick={e => deleteItem(_id as string)}
            sx={styles.deleteButton}>
              Delete
            </Button>
          }>
            <ListItemText
              primary={itemName}
            />
          </ListItem>
        </Box>
      ))}
    </Box>
  </Container>
  )
}

// const Index = ({ items }) => {
//   return (
//     <Container maxWidth="sm" sx={styles.root} >
//     <Typography variant="h4">Shopping List</Typography>
//     {/* <Box style={styles.inputBox}>
//       <TextField 
//             id="item-input" 
//             label="Item" 
//             variant="outlined"  
//             placeholder="Insert your item"
//             type="text"
//             value={item}
//             onChange={({ target }) => setItem(target.value)}
//             onKeyPress={handleKeyPress}
//             sx={styles.input}

//           />
//       <Button type="submit" variant="contained" onClick={createItem} sx={styles.button}>Add</Button>
//     </Box> */}
//     <Box>
//       {items.map(({ _id, itemName }, i) => (
//         <Box key={i}>
//           <ListItem 
//             alignItems="flex-start"
//             secondaryAction={
//             <Button 
//             color="error"
//             onClick={e => deleteItem(e, _id)}
//             sx={styles.deleteButton}>
//               Delete
//             </Button>
//           }>
//             <ListItemText
//               primary={itemName}
//             />
//           </ListItem>
//         </Box>
//       ))}
//     </Box>
//   </Container>
//   )
// }

