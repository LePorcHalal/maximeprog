///////////////////////////////////////////////////////////
//  PrimitiveAbs.cpp
//  Implementation of the Class PrimitiveAbs
//  Created on:      25-oct.-2018 20:47:13
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "PrimitiveAbs.h"
#include "Object3DVisitorAbs.h"

// Declaration d'un conteneur vide pour retourner des iterateurs toujours valides
Object3DContainer PrimitiveAbs::m_emptyContainer;

PrimitiveAbs::PrimitiveAbs(const Point3D & pt)
	: Object3DAbs(), m_center(pt)
{
}

PrimitiveAbs::PrimitiveAbs(Object3DAbs& parent)
	: Object3DAbs(parent)
{
}

PrimitiveAbs::PrimitiveAbs(Object3DAbs& parent, const Point3D& c)
	: Object3DAbs(parent), m_center(c)
{

}

PrimitiveAbs::~PrimitiveAbs(){

}

void PrimitiveAbs::addChild(const Object3DAbs& obj3d){
	// Echoue silencieusement
}

Object3DIterator PrimitiveAbs::begin(){

	return m_emptyContainer.end();
}

Object3DIterator_const PrimitiveAbs::cbegin() const {

	return m_emptyContainer.cend();
}

Object3DIterator_const PrimitiveAbs::cend() const {

	return m_emptyContainer.cend();
}

Object3DIterator PrimitiveAbs::end(){

	return m_emptyContainer.end();
}

void PrimitiveAbs::removeChild(Object3DIterator_const obj3dIt){
	// Echoue silencieusement
}

void PrimitiveAbs::replaceChild(Object3DIterator obj3dIt, const Object3DAbs & newObj)
{
	// Echoue silencieusement
}

Point3D PrimitiveAbs::getCenter() const {

	return  m_center;
}

void PrimitiveAbs::moveCenter(const Point3D & delta)
{
	m_center += delta;
}

void PrimitiveAbs::setCenter(const Point3D& center){
	m_center = center;
}

void PrimitiveAbs::accept(Object3DVisitorAbs & vis) const
{
	vis.visitPrimitive(*this);
}

void PrimitiveAbs::accept(Object3DVisitorAbs & vis)
{
	vis.visitPrimitive(*this);
}

std::ostream & operator<<(std::ostream & o, const Object3DAbs& obj3d )
{
	return obj3d.toStream(o);
}
