export const logoutUser = async (req, res) => {
    try{
        res.cookie("token", "");
        res.status(200).json({message: "User log out successfully"});
    }
    catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}