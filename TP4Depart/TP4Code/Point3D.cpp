///////////////////////////////////////////////////////////
//  Point3D.cpp
//  Implementation of the Class Point3D
//  Created on:      25-oct.-2018 23:16:57
//  Original author: p482457
///////////////////////////////////////////////////////////

#include "Point3D.h"

Point3D::Point3D(float x, float y, float z)
{
	m_coord[0] = x;
	m_coord[1] = y;
	m_coord[2] = z;
}

Point3D & Point3D::operator*=(float fact)
{
	m_coord[0] *= fact;
	m_coord[1] *= fact;
	m_coord[2] *= fact;

	return *this;
}

Point3D & Point3D::operator/=(float divid)
{
	m_coord[0] /= divid;
	m_coord[1] /= divid;
	m_coord[2] /= divid;

	return *this;
}

Point3D & Point3D::operator+=(const Point3D& pt)
{
	m_coord[0] += pt.x();
	m_coord[1] += pt.y();
	m_coord[2] += pt.z();

	return *this;
}

std::ostream & operator<<(std::ostream & o, const Point3D & s)
{
	return o << "( " << s.x() << ", " << s.y() << ", " << s.z() << ")";
}

Point3D operator+(const Point3D & p1, const Point3D & p2)
{
	return Point3D(p1.x() + p2.x(), p1.y() + p2.y(), p1.z() + p2.z());
}

Point3D operator-(const Point3D & p1, const Point3D & p2)
{
	return Point3D(p1.x() - p2.x(), p1.y() - p2.y(), p1.z() - p2.z());
}

bool operator==(const Point3D & p1, const Point3D & p2)
{
	const float small_eps = 1e-6;
	return ((p1.x() - p2.x()) < small_eps && (p1.y() - p2.y()) < small_eps && (p1.z() - p2.z()) < small_eps);
}

bool operator!=(const Point3D & p1, const Point3D & p2)
{
	return !(p1 == p2);
}
