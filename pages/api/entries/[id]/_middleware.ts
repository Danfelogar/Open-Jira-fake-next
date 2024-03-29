import mongoose from "mongoose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";



export function middleware(req: NextRequest, res:NextFetchEvent) {

    //if( req.page.name === '/api/entries' ) return NextResponse.next();

    const id = req.page.params?.id || '';
    console.log({id})
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if(!checkMongoIDRegExp.test( id )) {
        //return res.status(400).json({ message: 'El id no es valido' + id });
        return new Response( JSON.stringify({message: 'El id no es valido' + id }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return NextResponse.next();
}