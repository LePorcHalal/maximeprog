///////////////////////////////////////////////////////////
//  TransformedObjet3D.cpp
//  Implementation of the Class TransformedObjet3D
//  Created on:      26-oct.-2018 17:42:19
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "TransformedObjet3D.h"

TransformedObjet3D::TransformedObjet3D(const PrimitiveAbs & obj3d, const Point3D & translat, float scal)
	: m_objet3d(obj3d.clone()), m_translation(translat), m_scale(scal)
{
}

TransformedObjet3D::TransformedObjet3D(const TransformedObjet3D & mdd)
	: m_objet3d(mdd.m_objet3d->clone()), m_scale(mdd.m_scale), m_translation(mdd.m_translation)
{
}

TransformedObjet3D::~TransformedObjet3D(){

}

void TransformedObjet3D::addChild(const Objet3DAbs& obj3d){
	// Deleguer a l'objet decore la tache d'ajouter un enfant
}


Objet3DIterator TransformedObjet3D::begin()
{
	// A Completer...
	return Objet3DBaseIterator();
}


Objet3DIterator_const TransformedObjet3D::cbegin() const {

	// A Completer...
	return Objet3DBaseIterator();
}


Objet3DIterator_const TransformedObjet3D::cend() const {

	// A Completer...
	return Objet3DBaseIterator();
}


Objet3DAbs* TransformedObjet3D::clone() const 
{
	// A Completer...
	return nullptr;
}


Objet3DIterator TransformedObjet3D::end()
{
	// A Completer...
	return Objet3DBaseIterator();
}


Point3D TransformedObjet3D::getCenter() const 
{
	// A Completer...
	return Point3D();
}


size_t TransformedObjet3D::getNbParameters() const 
{
	// A Completer...
	return 0;
}


PrimitiveParams TransformedObjet3D::getParameters() const 
{
	// A Completer...
	return PrimitiveParams();
}


void TransformedObjet3D::moveCenter(const Point3D& delta){
	// A Completer...
}


void TransformedObjet3D::removeChild(Objet3DIterator_const obj3dIt)
{
	// Deleguer a l'objet decore la tache d'eliminer un enfant
	// A Completer...
}


void TransformedObjet3D::setCenter(const Point3D& center){
	// A Completer...
}


void TransformedObjet3D::setParameter(size_t pIndex, float pValue)
{
	// A Completer...
}

float TransformedObjet3D::getScale() const
{
	// A Completer...
	return 0.;
}

void TransformedObjet3D::setScale(float scal)
{
	// A Completer...
}

Point3D TransformedObjet3D::getTranslation() const
{
	// A Completer...
	return Point3D();
}

void TransformedObjet3D::setTranslation(const Point3D & translat)
{
	// A Completer...
}


std::ostream& TransformedObjet3D::toStream(std::ostream& o) const 
{
	o << "Objet Transforme: OBJET={ " << *m_objet3d 
	  << " }, Translation = " << m_translation << ", Scale = " << m_scale << std::endl;

	return  o;
}