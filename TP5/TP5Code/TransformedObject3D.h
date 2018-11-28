///////////////////////////////////////////////////////////
//  TransformedObject3D.h
//  Implementation of the Class TransformedObject3D
//  Created on:      26-oct.-2018 17:42:18
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_)
#define EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_

#include "PrimitiveAbs.h"

class TransformedObject3D : public PrimitiveAbs
{

public:
	TransformedObject3D(const PrimitiveAbs& primitiv, const Point3D& translat, float scal);
	TransformedObject3D(Object3DAbs& parent, const PrimitiveAbs& primitiv, const Point3D& translat, float scal);
	TransformedObject3D(Object3DAbs& parent, const TransformedObject3D& mdd);
	virtual ~TransformedObject3D();
	virtual TransformedObject3D* clone(Object3DAbs& parent) const;

	virtual void addChild(const Object3DAbs& obj3d);
	virtual Object3DIterator begin();
	virtual Object3DIterator_const cbegin() const;
	virtual Object3DIterator_const cend() const;
	virtual Object3DIterator end();
	virtual void removeChild(Object3DIterator_const obj3dIt);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

	virtual float getScale() const;
	virtual void setScale(float scal);
	virtual Point3D getTranslation() const;
	virtual void setTranslation(const Point3D& translat);
	virtual PrimitiveAbs& getObject3D();
	virtual const PrimitiveAbs& getObject3D() const;

	virtual void accept(class Object3DVisitorAbs& vis) const;
	virtual void accept(class Object3DVisitorAbs& vis);

protected:
	virtual std::ostream& toStream(std::ostream& o) const;

private:
	float m_scale;
	Point3D m_translation;
	std::unique_ptr<PrimitiveAbs> m_Object3d;
};
#endif // !defined(EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_)
