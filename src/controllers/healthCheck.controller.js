import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// const healthCheck = async (req, res) => {
//   try {
//     const getuserData=await getuserData();
//     return res
//       .status(200)
//       .json(new ApiResponse(200, { message: "Server is running" }));
//   } catch (error) {}
// };

let xyz = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is running" }));
};

const healthCheck = asyncHandler(xyz);
export { healthCheck };
