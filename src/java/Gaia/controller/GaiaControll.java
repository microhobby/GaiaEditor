package Gaia.controller;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

/**
 *
 * @author matheus
 */
@WebService(serviceName = "GaiaControll")
public class GaiaControll 
{
        /**
         * This is a sample web service operation
         */
        @WebMethod(operationName = "hello")
        public String hello(@WebParam(name = "name") String txt) {
                return "Hello " + txt + " !";
        }
}
