import axios from "axios";
import Site from "../TreeView/custom.json";
const apiUrl = process.env.REACT_APP_API_URL;

export const getTree = async () => {
  try {
    return Site;
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

export const fetchTree = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/treeJson/tree_data`, {
      headers: {
        Authorization: token,
      },
      params: {
        userId,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

export const updateTree = async (updatedTreeData) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiUrl}/treeJson/tree_dataUpdate`,
      updatedTreeData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (resp.status === 201) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

// export const deleteTree = async (updatedTreeData) => {
//   try {
//     const token = sessionStorage.getItem("token");
//     console.log(token);

//     const resp = await axios.delete(
//       `${apiUrl}/treeJson/tree_dataDelete`,
//       updatedTreeData,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     console.log(resp.data);

//     if (resp.status === 200) {
//       return resp.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error in auth service : ", error);
//   }
// };
// treeJson/tree_data

export const deleteTree = async (updatedTreeData) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiUrl}/treeJson/tree_dataDelete`,
      updatedTreeData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in tree service : ", error);
  }
};
