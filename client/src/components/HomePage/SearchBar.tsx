import * as React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [text, setText] = React.useState("");

  return (
    <Box>
      <TextField
        placeholder="Search"
        type="search"
        variant="standard"
        value={text}
        onChange={(event) => setText(event.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                onClick={(event) => alert(text)}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") alert(text);
        }}
      />
    </Box>
  );
}

export default SearchBar;
