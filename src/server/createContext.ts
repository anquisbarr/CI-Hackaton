import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../utils/jwt";
import { prisma } from '../utils/prisma'

export interface CtxUser {
    id: string,
    email: string,
    name: string,
    role: string,
    iat: string,
}

const getUserFromRequest = (req: NextApiRequest) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const verified = verifyJwt<CtxUser>(token);
            return verified;
        } catch(e) {
            return null;
        }
    }
    return null;
}

export function createContext({
    req, res
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    const user = getUserFromRequest(req);

    return {
        req,
        res,
        prisma,
        user,
    };
}

export type Context = ReturnType<typeof createContext>