///////////////////////////////////////////////////////////
//  Objet3DComposite.cpp
//  Implementation of the Class Objet3DComposite
//  Created on:      25-oct.-2018 20:40:33
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Objet3DComposite.h"


Objet3DComposite::Objet3DComposite() {

}

Objet3DComposite::Objet3DComposite(const Objet3DComposite & mdd)
{
	// A Completer...
	for (auto iter = mdd.cbegin(); iter != mdd.cend(); ++iter)
		addChild(*iter);
}

Objet3DComposite::~Objet3DComposite() {
}

Objet3DComposite * Objet3DComposite::clone() const
{
	return nullptr;
	//return (new Objet3DComposite(*this));
}

void Objet3DComposite::addChild(const Objet3DAbs& obj3d)
{
	// A Completer...
	std::unique_ptr<Objet3DAbs> objet(obj3d.clone());
	m_objetContainer.push_back(objet);
	//m_objetContainer.push_back(std::move(objet));

	//Objet3DAbs* ptr = obj3d.clone();
	//m_objetContainer.push_back(ptr);

}

Objet3DIterator Objet3DComposite::begin() {

	// A Completer...
	return Objet3DIterator(m_objetContainer.begin());
}

Objet3DIterator_const Objet3DComposite::cbegin() const {

	// A Completer...
	return Objet3DIterator_const(m_objetContainer.cbegin());
}

Objet3DIterator_const Objet3DComposite::cend() const {

	// A Completer...
	return Objet3DIterator_const(m_objetContainer.cend());
}

Objet3DIterator Objet3DComposite::end() {

	// A Completer...
	return Objet3DBaseIterator(m_objetContainer.end());
}

Point3D Objet3DComposite::getCenter() const {

	// A Completer...
	//return Point3D();
	return computeCenter();
}

size_t Objet3DComposite::getNbParameters() const
{
	return 0;
}

PrimitiveParams Objet3DComposite::getParameters() const {

	return  PrimitiveParams();
}

void Objet3DComposite::removeChild(Objet3DIterator_const obj3dIt)
{
	// A Completer...
	//m_objetContainer.erase((Objet3DContainer::const_iterator)obj3dIt);
	m_objetContainer.erase(obj3dIt);
}

void Objet3DComposite::moveCenter(const Point3D & delta)
{
	// A Completer...
	Point3D temp = getCenter();
	temp.x += delta.x;
	temp.y += delta.y;
	temp.z += delta.z;
	setCenter(temp);
}

void Objet3DComposite::setCenter(const Point3D& center) {
	// A Completer...


}

void Objet3DComposite::setParameter(size_t pIndex, float pValue) {

}

Point3D Objet3DComposite::computeCenter() const
{
	// Calcul la moyenne des centres de tous les enfants
	// S'il n'y a pas d'enfant, initialise a (0,0,0)

	// A Completer...
	Point3D m_center;
	return m_center;
}

// Variable statique permettant de stocker le niveau d'indentation
size_t Objet3DComposite::outputIndent = 0;

std::ostream& indentation(std::ostream& o, size_t indentLevel)
{
	for (auto iindent = 0; iindent < indentLevel; ++iindent)
		o << "\t";
	return o;
}

std::ostream & Objet3DComposite::toStream(std::ostream & o) const
{
	o << "Composite: center = " << computeCenter() << ": {" << std::endl;
	++outputIndent;
	for (auto it = cbegin(); it != cend(); ++it)
		indentation(o, outputIndent) << *it << std::endl;
	--outputIndent;
	indentation(o, outputIndent) << "}";

	return o;
}
