///////////////////////////////////////////////////////////
//  Object3DComposite.h
//  Implementation of the Class Object3DComposite
//  Created on:      25-oct.-2018 20:40:33
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_)
#define EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_

#include "Object3DAbs.h"

class Object3DComposite : public Object3DAbs
{

public:
	Object3DComposite();
	Object3DComposite(Object3DAbs& parent);
	Object3DComposite(Object3DAbs& parent, const Object3DComposite& mdd);
	virtual ~Object3DComposite();
	virtual Object3DComposite* clone(Object3DAbs& parent) const;

	virtual void addChild(const Object3DAbs& obj3d);
	virtual Object3DIterator begin();
	virtual Object3DIterator_const cbegin() const;
	virtual Object3DIterator_const cend() const;
	virtual Object3DIterator end();
	virtual void removeChild(Object3DIterator_const obj3dIt);
	virtual void replaceChild(Object3DIterator obj3dIt, const Object3DAbs& newObj);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

	virtual void accept(class Object3DVisitorAbs& vis) const;
	virtual void accept(class Object3DVisitorAbs& vis);

protected:
	Point3D computeCenter() const;

	virtual std::ostream& toStream(std::ostream& o) const;
	static size_t outputIndent;

	Object3DContainer m_ObjectContainer;
};
#endif // !defined(EA_B3F4EF6C_5851_4239_9FC3_5E8BB6446332__INCLUDED_)
