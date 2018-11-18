///////////////////////////////////////////////////////////
//  PrimitiveAbs.cpp
//  Implementation of the Class PrimitiveAbs
//  Created on:      25-oct.-2018 20:47:13
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "PrimitiveAbs.h"

// Declaration d'un conteneur vide pour retourner des iterateurs toujours valides
Objet3DContainer PrimitiveAbs::m_emptyContainer;

PrimitiveAbs::PrimitiveAbs() {

}

PrimitiveAbs::PrimitiveAbs(const Point3D& c)
// A Completer...
{
	m_center = c;
}

PrimitiveAbs::~PrimitiveAbs() {

}

void PrimitiveAbs::addChild(const Objet3DAbs& obj3d) {
	// Echoue silencieusement
}

Objet3DIterator PrimitiveAbs::begin() {

	// A Completer...
	return Objet3DBaseIterator(m_emptyContainer.begin());
}

Objet3DIterator_const PrimitiveAbs::cbegin() const {

	// A Completer...
	return Objet3DBaseIterator_const(m_emptyContainer.cbegin());
}

Objet3DIterator_const PrimitiveAbs::cend() const {

	// A Completer...
	return Objet3DBaseIterator_const(m_emptyContainer.cend());
}

Objet3DIterator PrimitiveAbs::end() {

	// A Completer...
	return Objet3DBaseIterator(m_emptyContainer.end());
}

void PrimitiveAbs::removeChild(Objet3DIterator_const obj3dIt) {
	// Echoue silencieusement
}

Point3D PrimitiveAbs::getCenter() const {

	// A Completer...
	return m_center;
}

void PrimitiveAbs::moveCenter(const Point3D & delta)
{
	// A Completer...
	m_center = m_center + delta;
}

void PrimitiveAbs::setCenter(const Point3D& center)
{
	// A Completer...
	m_center = center;
}

std::ostream & operator<<(std::ostream & o, const Objet3DAbs& obj3d)
{
	return obj3d.toStream(o);
}
