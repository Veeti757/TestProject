#include "environment.h"

environment::environment() {}

QString environment::getBaseUrl()
{
    return "http://localhost:3000";
    // ideana, että voidaan tarvittaessa helposti
    // return "https://myserver.com";
}


