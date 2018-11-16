///////////////////////////////////////////////////////////
//  Torus.cpp
//  Implementation of the Class Torus
//  Created on:      25-oct.-2018 20:47:54
//  Original author: V. Angell, V. Tessier
///////////////////////////////////////////////////////////

#include "Torus.h"

Torus::Torus(const Point3D& pt, float r, float R)
	: PrimitiveAbs(pt)
{
	if (r < 0.0 || R < 0.0)
		throw std::range_error("Invalid parameter value for torus. Must be larger than 0");

	// A Completer...
	m_dimensions[0] = r;
	m_dimensions[1] = R;
}

Torus::~Torus() {
}

Torus * Torus::clone() const
{
	// A Completer...
	return new Torus(m_center, m_dimensions[0], m_dimensions[1]);
}

size_t Torus::getNbParameters() const {

	// A Completer...
	return getParameters().size();
}

PrimitiveParams Torus::getParameters() const
{
	// A Completer...
	PrimitiveParams parametres;
	parametres.push_back(m_dimensions[0]);
	parametres.push_back(m_dimensions[1]);
	return parametres;
}

void Torus::setParameter(size_t pIndex, float pValue) {
	if (pIndex < 0 || pIndex > 1)
		throw std::range_error("Invalid parameter index for torus. Must be between 0 and 1");

	if (pValue < 0.0)
		throw std::range_error("Invalid parameter value for torus. Must be larger than 0");

	// A Completer...
	m_dimensions[pIndex] = pValue;
}

std::ostream & Torus::toStream(std::ostream & o) const
{
	return o << "Torus:  center = " << m_center
		<< "; r = " << m_dimensions[0]
		<< "; R = " << m_dimensions[1] << ";";
}

