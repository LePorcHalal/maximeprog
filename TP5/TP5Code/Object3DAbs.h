///////////////////////////////////////////////////////////
//  Object3DAbs.h
//  Implementation of the Class Object3DAbs
//  Created on:      25-oct.-2018 10:31:08
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_)
#define EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_

#include <iostream>

#include "Point3D.h"
#include "Object3DContainer.h"

class Object3DAbs
{

public:
	Object3DAbs() : m_parent(*this) {};
	Object3DAbs( Object3DAbs& parent) : m_parent(parent) {};
	virtual ~Object3DAbs() = default;
	virtual Object3DAbs* clone(Object3DAbs& parent) const =0;

	virtual void addChild(const Object3DAbs& obj3d) =0;
	virtual Object3DIterator begin() =0;
	virtual Object3DIterator_const cbegin() const =0;
	virtual Object3DIterator_const cend() const =0;
	virtual Object3DIterator end() =0;
	virtual void removeChild(Object3DIterator_const obj3dIt) = 0;
	virtual void replaceChild(Object3DIterator obj3dIt, const Object3DAbs& newObj) = 0;

	virtual Point3D getCenter() const =0;
	virtual void moveCenter(const Point3D& delta) =0;
	virtual void setCenter(const Point3D& center) = 0;

	virtual size_t getNbParameters() const = 0;
	virtual PrimitiveParams getParameters() const = 0;
	virtual void setParameter(size_t pIndex, float pValue) =0;

	virtual bool isRoot() const { return (&m_parent == this); }
	virtual const Object3DAbs& getParent() const { return m_parent; }
	virtual Object3DAbs& getParent() { return m_parent; }

	virtual void accept(class Object3DVisitorAbs& vis) const = 0;
	virtual void accept(class Object3DVisitorAbs& vis) = 0;

	friend std::ostream& operator<<(std::ostream& o, const Object3DAbs& obj3d);

protected:
	virtual std::ostream& toStream(std::ostream& o) const = 0;
	Object3DAbs& m_parent;
};
#endif // !defined(EA_631D7BD7_EE02_4efc_B70C_753FF41F2621__INCLUDED_)
