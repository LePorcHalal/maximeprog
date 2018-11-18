///////////////////////////////////////////////////////////
//  Cube.cpp
//  Implementation of the Class Cube
//  Created on:      25-oct.-2018 20:47:57
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Cube.h"


Cube::Cube(const Point3D& pt, float ln, float lg, float ht)
	: PrimitiveAbs(pt)
{
	if (ln < 0.0 || lg < 0.0 || ht < 0.0)
		throw std::range_error("Invalid dimension value for cube. Must be larger than 0");

	// A Completer...
	m_dimensions[0] = ln;
	m_dimensions[1] = lg;
	m_dimensions[2] = ht;
}

Cube::~Cube(){
}

Cube * Cube::clone() const
{
	// A Completer...
	return new Cube(m_center, m_dimensions[0], m_dimensions[1], m_dimensions[2]);
}

size_t Cube::getNbParameters() const {

	// A Completer...
	return getParameters().size();
}

PrimitiveParams Cube::getParameters() const 
{
	// A Completer...
	PrimitiveParams parametres;
	parametres.push_back(m_dimensions[0]);
	parametres.push_back(m_dimensions[1]);
	parametres.push_back(m_dimensions[2]);
	return parametres;
}

void Cube::setParameter(size_t pIndex, float pValue){
	if (pIndex < 0 || pIndex > 2)
		throw std::range_error("Invalid parameter index for cube. Must be between 0 and 2");

	if(pValue<0.0)
		throw std::range_error("Invalid dimension value for cube. Must be larger than 0");

	// A Completer...
	m_dimensions[pIndex] = pValue;
}

std::ostream & Cube::toStream(std::ostream & o) const
{
	return o << "Cube:      center = " << m_center
		<< "; ln = " << m_dimensions[0]
		<< "; lg = " << m_dimensions[1]
		<< "; ht = " << m_dimensions[2] << ";";
}
