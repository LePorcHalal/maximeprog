///////////////////////////////////////////////////////////
//  XMLPrintCmd.cpp
//  Implementation of the Class XMLPrintCmd
//  Created on:      08-nov.-2018 21:04:53
//  Original author: p482457
///////////////////////////////////////////////////////////

#include <iostream>

#include "XMLPrintCmd.h"
#include "VisitorXMLWriter.h"


XMLPrintCmd::XMLPrintCmd(const Object3DAbs & obj3d)
	: m_obj3d(obj3d)
{
}

void XMLPrintCmd::cancel()
{
	// RIEN A FAIRE. La ligne suivante peut etre activee pour generer un message de debug
	// std::cerr << "XMLPrintCmd::cancel(): rien a annuler pour la commande XMLPrintCmd" << std::endl;
}


void XMLPrintCmd::execute()
{
	// A COMPLETER
	//		- Construire un visiteur d'ecriture en XML
	//		- Appliquer le visiteur sur l'objet
}