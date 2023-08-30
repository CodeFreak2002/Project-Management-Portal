import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState({});
    const [teacher, setTeacher] = useState({});
    return <AuthContext.Provider value={{student, setStudent, teacher, setTeacher}}>{children}</AuthContext.Provider>
}

export default AuthContext;